import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../_base-classes/npc';

@EventData({
    name: 'nle-kenji', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
        this.setGraphic('nle-kenji');
        this.name = "Kenji";
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, `'Ello, guvna.`);
    }
} 