import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'somewhere-cg-enter-e',
})
export default class ZoneChange extends RpgEvent {
    onInit() {
        this.setGraphic('female');
    }
    onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        player.changeMap(this.properties['dest'], { x: this.properties['destX'] * destinationMapScale, y: this.properties['destY'] * destinationMapScale });
    }
}