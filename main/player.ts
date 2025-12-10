import { RpgPlayer, type RpgPlayerHooks, Control, Components, RpgShape, ShapePositioning, Direction, RpgMap, inject, RpgServerEngine, Move } from '@rpgjs/server'
import { Vector2d } from '@rpgjs/common'
import Tero from './database/actors/tero';
import Config from './config';
import TeleportRedirects from './lists/teleport-redirects';
import { PositionXY_OptionalZ } from '@rpgjs/types';

const destinationMapScale = 32;


declare module '@rpgjs/server' {
    export interface IMapLocationSnapshot {
        /** The name of the map */
        map: string;
        position: PositionXY_OptionalZ;
        direction: Direction;
    }
    export interface RpgPlayer {
        layersToHide: string[];
        layersToShow: string[];
        partyRoster: string[];
        activeParty: string[];
        mapLocationResumeData: IMapLocationSnapshot;
    }
}

//#region Handlers and helpers
function handleHideLayersObject(player: RpgPlayer, shape: RpgShape, inShape: boolean) {
    const hideLayersProp = shape.properties['hideLayers'] as string|undefined;
    const newValue = !inShape;
        
    if (hideLayersProp) {
        const layersToHide = hideLayersProp.split(",");
        const map = player.getCurrentMap();

        if (!map) {
            return;
        }
        
        const showLayers: string[] = [];
        const hideLayers: string[] = [];
        layersToHide.forEach(layerName => {
            const layer = map.getLayerByName(layerName.trim());
            if (layer) {
                layer.visible = newValue;
                // layer.opacity = inShape? 0.1 : 1;
                if (inShape) {
                    hideLayers.push(layerName.trim());
                }
                else {
                    showLayers.push(layerName.trim());
                }
            }
        });

        if (inShape) {
            // player.setVariable("HIDE_LAYERS", hideLayers);
            // player.removeVariable("SHOW_LAYERS");
            player.layersToHide = hideLayers;
            player.layersToShow = [];
        }
        else {
            // player.removeVariable("HIDE_LAYERS");
            // player.setVariable("SHOW_LAYERS", showLayers);
            player.layersToHide = [];
            player.layersToShow = showLayers;
        }
        
        player.syncChanges();
        // player.changeMap(map.id, { x: player.posX, y: player.posY });
    }
}

/**Handle transition from different map */
async function handleTeleportDestination(player: RpgPlayer, map: RpgMap) {
    const destPoint = player.getVariable("destPoint") as string|undefined;
    if (!destPoint) { return; } // No useful teleport data. Abort.
    const shape = map.getShape(destPoint);
    if (!shape) { return; } // Intended landing point doesn't exist. Abort.

    const landDir = shape.properties['dir'] || shape.properties['landDir'] as string|undefined;
    const destDir = landDir || player.getVariable("destDir") as string|undefined;

    if (shape.point || !destDir) {
        // Nice and simple. Teleport to object by name.
        await player.teleport(destPoint);
    }
    else {
        const dir = getDirectionFromShapeProperty(destDir);
        // const offsetDirectionX = 
        //     dir >= 2.5 && dir <= 3.5 ? -1 
        //         : [Direction.Right, Direction.DownRight, Direction.UpRight].includes(dir) ? 
        //             1 : 0;
        const offsetDirectionX = 
            [Direction.Left, Direction.DownLeft, Direction.UpLeft].includes(dir) ? 
                -1 
                : [Direction.Right, Direction.DownRight, Direction.UpRight].includes(dir) ? 
                    1 : 0;
        const offsetStrengthX = [Direction.Left, Direction.Right].includes(dir) ? 1 : 0.5;
        const offsetDirectionY = 
            [Direction.Up, Direction.UpLeft, Direction.UpRight].includes(dir) ? 
                -1 
                : [Direction.Down, Direction.DownLeft, Direction.DownRight].includes(dir) ? 
                    1 : 0;
        const offsetStrengthY = [Direction.Down, Direction.Up].includes(dir) ? 1 : 0.5;

        const offset = new Vector2d(
            offsetDirectionX * ((player.width * offsetStrengthX) + Math.ceil(shape.width/2)) - 1,
            offsetDirectionY * ((player.height * offsetStrengthY) + Math.ceil(shape.height/2)) - 1
        );
        const targetShapeCenter = shape.position.add(new Vector2d(Math.ceil(shape.width/2), Math.ceil(shape.height/2)));
        const adjustedDestination = targetShapeCenter.add(offset);
        await player.teleport(adjustedDestination);
        player.changeDirection(dir);
    }

    // Clean up the variables now that they are no longer needed.
    player.removeVariable("destPoint");
    player.removeVariable("destDir");
}

function getDirectionFromShapeProperty(destDir: string): Direction {
    switch (destDir) {
        case "down":
        case "d":
            return Direction.Down;
        case "left":
        case "l":
            return Direction.Left;
        case "right":
        case "r":
            return Direction.Right;
        case "up":
        case "u":
            return Direction.Up;
        default:
            return Direction.Down;
    }
}

async function handleZoneChangeObject(player: RpgPlayer, shape: RpgShape) {
    const baseDestName = shape.properties['dest'] as string|undefined;
    let destName: string|undefined;
    const destX = shape.properties['destX'] as number|undefined;
    const destY = shape.properties['destY'] as number|undefined;
    const destZ = shape.properties['destZ'] as number|undefined;
    const destDir = shape.properties['destDir'] as string|undefined;
    const destPoint = shape.properties["destPoint"] as string|undefined;

    // get any redirects
    if (baseDestName) {
        const applicableRedirects = TeleportRedirects.filter(r => r.id == baseDestName);
        destName = applicableRedirects.length > 0? applicableRedirects[0].substitution : baseDestName;
    }

    const hasEnoughData = !!destName || (destX && destY) || !!destPoint;

    if (!hasEnoughData) {
        if (Config.debug) {
            console.log(`Insufficient data to perform desired teleport.`, shape.properties);
        }
        return;
    }

    // Handle teleports

    if (destName) { // Target wants to change maps
        const server = inject(RpgServerEngine);
        // if (!player.server.sceneMap.getMapBydId(destName))
        if (!server.sceneMap.getMapBydId(destName)) { // Desired map doesn't exist. Abort.
            if (Config.debug) {
                console.log(`Could not find map: ${destName}`);
            }
            return;
        }
        else { // Desired map exists. Proceed.
            if (destPoint) { player.setVariable("destPoint", destPoint); } // Store the name of the point or shape where the player should land in the next map
            if (destDir) { player.setVariable("destDir", destDir); } // Store this in case it is needed when parsing destPoint in onJoinMap()

            // Do the actual map change
            if (destX && destY) {
                await player.changeMap(destName, { x: destX * destinationMapScale, y: destY * destinationMapScale });
            }
            else {
                await player.changeMap(destName);
            }
        }
    }
    else { // Target wants to teleport within the current map
        // Do the actual teleport
        if (destPoint) {
            await player.teleport(destPoint);
        }
        else if (destX && destY) {
            await player.teleport({ x: destX * (player.getCurrentMap()?.tileWidth || destinationMapScale), y: destY * destinationMapScale });
        }
    }
    
    // Post Teleport things
    if (destDir) {
        // Make the character face the correct direction
        player.changeDirection(getDirectionFromShapeProperty(destDir));
    }
}
//#endregion Handlers and helpers

const player: RpgPlayerHooks = {
    props: {
        // Add any custom properties needed on the client
        layersToHide: Array<String>,
        layersToShow: Array<String>,
        partyRoster: Array<String>,
        activeParty: Array<String>
    },
    onConnected(player: RpgPlayer) {
        player.layersToHide = [];
        player.layersToShow = [];
        player.activeParty = [ "Tero", "cobb" ];
        player.partyRoster = [ "Tero", "cobb" ];

        player.name = 'Tero';
        // player.setComponentsTop(Components.text('{name}'));
        // player.setComponentsTop(Components.text('{name}', {
        //     fill: '#ffffff',
        //     fontSize: 20
        // }))
        // player.setComponentsTop(
        //     Components.hpBar(), {
        //     width: 42
        // })
        player.setActor(Tero);
        player.items ||= [];
        player.speed = Config.debug? 4 : 2;
        // player.exp = 535;
        player.on('click', () => {
            console.log(player.id)
        });
    },
    async onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }

        if (input == Control.Action) {

        }

        if (input == Control.Attack) {
            
        }

        if (input == Control.Skill) {
            
        }
        
        if (input == Control.Defense) {
            
        }

        //#region movement inputs
        
        let tryingToMove = false;
        if (input == Control.Up || input == Control.Left || Control.Right || Control.Down) {
            tryingToMove = true;
        }
        player.setVariable("tryingToMove", tryingToMove);

        // Try to do cool movement handling here. Maybe lock to grid.
        // player.canMove = false;
        // if (input == Control.Up) {
        //     await player.moveRoutes([ Move.tileUp() ]);
        // }
        // if (input == Control.Left) {
        //     await player.moveRoutes([ Move.tileLeft() ]);
        // }
        // if (input == Control.Right) {
        //     await player.moveRoutes([ Move.tileRight() ]);
        // }
        // window.setTimeout(() => {
        //     player.stopMoveTo();
        //     player.canMove = true;
        // }, 100);


        // player.canMove = true;
        //#endregion movement inputs
    },
    async onJoinMap(player: RpgPlayer, map: RpgMap) {
        const debug = Config.debug;

        //Handle transition from different map
        await handleTeleportDestination(player, map);

        // Configure camera
        player.cameraFollow(
            player,
            {
                // smoothMove: true,
                smoothMove: {
                    time: 2000,
                    ease: 'easeInSine'
                },
            }
        );

        // Configure radius to highlight interactive
        player.attachShape({
            height: 100,
            width: 100,
            positioning: ShapePositioning.Center,
            name: 'player-interact-shape'
        });

        
        //Useless crap that serves only to remind me about player variables.
        if (player.getVariable('SHOW_INTRO')) {
            await player.showText('Welcome to the start of RPGJS. Short presentation of the structure:');
            await player.showText('1. Open the map src/modules/main/server/maps/tmx/samplemap.tmx with Tiled Map Editor !');
            await player.showText('2. All the modules are in src/modules/index.ts, it is a suite of systems to make a complete set. Remove modules or add some!');
            await player.showText('3. The global configuration is done in src/config');
            await player.showText('And, please, support the project on github https://github.com/RSamaium/RPG-JS ! :)');
            player.removeVariable('SHOW_INTRO');
            return;   
        }
    },
    async onInShape(player: RpgPlayer, shape: RpgShape) {
        if (Config.debug) {
            console.log(`player in shape: ${shape.name}`);
        }

        const baseDestName = shape.properties['dest'] as string|undefined;
        let destName: string|undefined;
        const destX = shape.properties['destX'] as number|undefined;
        const destY = shape.properties['destY'] as number|undefined;
        const destZ = shape.properties['destZ'] as number|undefined;
        const destDir = shape.properties['destDir'] as string|undefined;
        const destPoint = shape.properties["destPoint"] as string|undefined;
        const storeMapLocation = shape.properties["storeLocation"] as boolean|undefined;

        if (storeMapLocation) { // Store player's current position to allow it to be resumed after an event (such as a battle or cutscene)
            player.mapLocationResumeData = {
                map: player.map,
                position: player.position,
                direction: player.direction
            }
        }

        if (baseDestName) { // Handle teleports
            // get any redirects
            const applicableRedirects = TeleportRedirects.filter(r => r.id == baseDestName);
            destName = applicableRedirects.length > 0? applicableRedirects[0].substitution : baseDestName;
        }

        if (destName || (destX && destY) || destPoint) { // Handle teleports
            await handleZoneChangeObject(player, shape);
        }
        // Shape wasn't a zone transition. Handle it as whatever it is.
        else {
            // Try to hide any specified layers so that they don't obscure the player.
            handleHideLayersObject(player, shape, true);
        }
    },
    async onOutShape(player: RpgPlayer, shape: RpgShape) {
        if (Config.debug) {
            console.log(`player out shape: ${shape.name}`);
        }

        // Unhide any layers that were previously hidden to accommodate player visibility.
        handleHideLayersObject(player, shape, false);
    },
    onDead(player: RpgPlayer) {
        
    },
    onMove(player: RpgPlayer) {
        // // Bad. Makes player freak out and miss teleporters
        // if (!player.getVariable("tryingToMove")) {
        //     player.position.set(new Vector2d(Math.round(player.posX), Math.round(player.posY)));
        //     player.stopMoveTo();
        // }
    },
}

export default player;