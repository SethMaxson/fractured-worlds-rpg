import { RpgEvent, EventData, RpgPlayer, RpgMap, Components, ShapePositioning } from '@rpgjs/server'
import TeleportDestinations from '../../lists/teleport-destinations';
import { HitBox, HitObject, HitType } from '@rpgjs/types';

@EventData({
    name: 'battle-test', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('ancient-crystal');
        this.name = 'Battle Test';
        this.setComponentsTop(
            Components.text('{name}', { fill: '#ff6666', fontSize: 12, fontFamily: "Pixelify Sans" } ),
            {
                width: 64,
                height: 20,
                marginTop: 5,
           }
        );
    }
    async onAction(player: RpgPlayer) {
        const battleGui = player.gui("rpg-battle");

        battleGui.open();
    }
} 