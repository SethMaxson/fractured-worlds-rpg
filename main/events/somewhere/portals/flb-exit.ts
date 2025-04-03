import { RpgEvent, EventData, RpgPlayer, RpgShape, ShapePositioning } from '@rpgjs/server'

@EventData({
    name: 'somewhere-flb-exit',
})
export default class ZoneChange extends RpgEvent {
    onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        player.changeMap('somewhere-district-1', { x: 31 * destinationMapScale, y: 28 * destinationMapScale, z: 1 });
    }
} 