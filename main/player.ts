import { RpgPlayer, type RpgPlayerHooks, Control, Components, RpgShape } from '@rpgjs/server'
import Tero from './database/actors/tero';

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Tero'
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
        // player.exp = 535;
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        player.cameraFollow(player, {});
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
        const destName = shape.properties['dest'];
        const destX = shape.properties['destX'];
        const destY = shape.properties['destY'];
        const destZ = shape.properties['destZ'];

        if (!destName) {
            return;
        }

        if (destX && destY) {
            player.changeMap(destName, { x: destX * destinationMapScale, y: destY * destinationMapScale });
        }
        else {
            player.changeMap(destName);
        }
    }
}

export default player