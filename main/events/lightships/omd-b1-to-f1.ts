import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'omd-b1-to-f1',
})
export default class ZoneChange extends RpgEvent {
    async onPlayerTouch(player: RpgPlayer) {
        if (player.getVariable('CHANGING_ZONE')) {
            // await player.moveRoutes([ Move.tileRight(1) ]);
            // player.setVariable('CHANGING_ZONE', false);
            return;
        }
        const destinationMapScale = 32;
        player.setVariable('CHANGING_ZONE', true);
        // await player.moveRoutes([ Move.tileLeft(1) ]);
        await player.teleport({ x: 11 * destinationMapScale, y: 16 * destinationMapScale });
        // await player.moveTo({ x: 10 * destinationMapScale, y: 16 * destinationMapScale });
        await player.moveRoutes([ Move.tileLeft(2) ]);
        // await player.moveRoutes([ Move.tileLeft(1) ]);
        player.setVariable('CHANGING_ZONE', false);
    }
} 