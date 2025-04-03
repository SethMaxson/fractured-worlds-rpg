import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';

@EventData({
    name: 'THRODEN-1', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('throden');
        this.name = "Shopkeeper";
        // this.setComponentsTop(Components.text('{name}'));
        this.setComponentsTop(Components.text('{name}', {
            fill: '#ffee00'
        }));
    }
    async onAction(player: RpgPlayer) {
        await player.showText('I give you 10 gold.', {
            talkWith: this
        })
        player.gold += 10
    }
} 