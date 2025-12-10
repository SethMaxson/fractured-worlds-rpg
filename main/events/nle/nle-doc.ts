import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../_base-classes/npc';

@EventData({
    name: 'nle-doc', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
        this.setGraphic('nle-doc');
        this.name = "Doc Brown";
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, "Great Scott!");
    }
} 