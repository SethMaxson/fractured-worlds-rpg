import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'omd-f1-to-f2',
})
export default class ZoneChange extends RpgEvent {
    onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        player.teleport({ x: 2 * destinationMapScale, y: 14 * destinationMapScale });
    }
} 