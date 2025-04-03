import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'

@EventData({
    name: 'omd-f1-to-b1',
})
export default class ZoneChange extends RpgEvent {
    async onPlayerTouch(player: RpgPlayer) {
        if (player.getVariable('CHANGING_ZONE')) {
            // await player.moveRoutes([ Move.tileLeft(1) ]);
            // player.setVariable('CHANGING_ZONE', false);
            return;
        }
        const destinationMapScale = 32;
        player.setVariable('CHANGING_ZONE', true);
        // await player.moveRoutes([ Move.tileRight(1) ]);
        player.teleport({ x: 20 * destinationMapScale, y: 14 * destinationMapScale });
        player.setVariable('CHANGING_ZONE', false);
    }
} 