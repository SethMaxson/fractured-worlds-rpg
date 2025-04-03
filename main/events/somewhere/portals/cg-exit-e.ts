import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'somewhere-cg-exit-e',
})
export default class ZoneChange extends RpgEvent {
    onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        player.changeMap('somewhere-district-1', { x: 25 * destinationMapScale, y: 27 * destinationMapScale });
    }
}