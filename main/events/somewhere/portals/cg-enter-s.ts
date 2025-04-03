import { RpgEvent, EventData, RpgPlayer, RpgPlayerHooks, RpgShape, Components } from '@rpgjs/server'

@EventData({
    name: 'somewhere-cg-enter-s',
})
export default class ZoneChange extends RpgEvent implements RpgPlayerHooks {
    onInit() {
        this.name = "To Jeweler";
        this.setComponentsTop(Components.text('{name}', {
            fill: '#808080'
        }));
    }
    onPlayerTouch(player: RpgPlayer) {
        this.travel(player);
    }
    onInShape(player: RpgPlayer, shape: RpgShape) {
        this.travel(player);
    }
    travel(player: RpgPlayer) {
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