import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'omd-f2-to-f1',
})
export default class ZoneChange extends RpgEvent {
    async onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        // player.canMove = false;
        await player.teleport({ x: 10 * destinationMapScale, y: 14 * destinationMapScale });
        await player.moveTo({ x: 10 * destinationMapScale, y: 15 * destinationMapScale }, { infinite: false });
        // player.canMove = true;
    }
} 