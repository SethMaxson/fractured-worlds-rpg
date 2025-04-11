import { RpgPlayer, type RpgPlayerHooks, Control, Components, RpgShape, ShapePositioning, Direction } from '@rpgjs/server'
import Tero from './database/actors/tero';
import Config from './config';

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {

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
        // player.exp = 535;
        player.on('click', () => {
            console.log(player.id)
        });
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        const debug = Config.debug;

        // Configure camera
        player.cameraFollow(
            player,
            {
                smoothMove: true,
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
        const destinationMapScale = 32;
        console.log(`player in shape: ${shape.name}`);
        const destName = shape.properties['dest'] as string|undefined;
        const destX = shape.properties['destX'] as number|undefined;
        const destY = shape.properties['destY'] as number|undefined;
        const destZ = shape.properties['destZ'] as number|undefined;
        const destDir = shape.properties['destDir'] as string|undefined;

        if (destName) {
            if (destX && destY) {
                await player.changeMap(destName, { x: destX * destinationMapScale, y: destY * destinationMapScale });
            }
            else {
                await player.changeMap(destName);
            }
            if (destDir) {
                switch (destDir) {
                    case "down":
                    case "d":
                        player.changeDirection(Direction.Down)
                        break;
                    case "left":
                    case "l":
                        player.changeDirection(Direction.Left)
                        break;
                    case "right":
                    case "r":
                        player.changeDirection(Direction.Right)
                        break;
                    case "up":
                    case "u":
                        player.changeDirection(Direction.Up)
                        break;
                    default:
                        break;
                }
                
            }
        }
    }
}

export default player