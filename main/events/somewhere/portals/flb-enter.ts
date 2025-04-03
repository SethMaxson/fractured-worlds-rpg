import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'somewhere-flb-enter',
})
export default class ZoneChange extends RpgEvent {
    onInit() {
        this.name = "To Jeweler";
        this.setComponentsTop(Components.text('{name}', {
            fill: '#808080'
        }));
    }
    onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        player.changeMap('somewhere-interior-frost-lords-bounty-f1', { x: 4 * destinationMapScale, y: 13 * destinationMapScale });
    }
}