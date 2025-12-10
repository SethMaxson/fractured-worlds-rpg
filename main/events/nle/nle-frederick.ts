import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../_base-classes/npc';

@EventData({
    name: 'nle-frederick', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
        this.setGraphic('nle-frederick');
        this.name = "North";
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, "How are you already talking to me? This is nearly a spoiler.");
    }
} 