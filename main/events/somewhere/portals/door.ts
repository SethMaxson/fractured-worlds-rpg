import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'door',
})
export default class ZoneChange extends RpgEvent {
    onInit() {
        this.setGraphic('female');
    }
    onPlayerTouch(player: RpgPlayer) {
        const destinationMapScale = 32;
        const destX = this.properties['destX'];
        const destY = this.properties['destY'];
        const destZ = this.properties['destZ'];
        if (destX && destY) {
            player.changeMap(this.properties['dest'], { x: destX * destinationMapScale, y: destY * destinationMapScale });
        }
        else {
            player.changeMap(this.properties['dest']);
        }
    }
}