import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../_base-classes/npc';

@EventData({
    name: 'nle-althea', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
        this.setGraphic('nle-althea');
        this.name = "Althea";
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, `It's nice to see you're still around and kicking, ${player.name}. It would be have been awful if you had died in some horrible manner... like your internal organs being liquefied by extreme g-forces or something.`);
    }
} 