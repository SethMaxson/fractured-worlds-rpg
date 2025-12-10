import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../_base-classes/npc';

@EventData({
    name: 'nle-nortle', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
        this.setGraphic('nortle');
        this.name = "Nortle";
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, "I am a very old turtle person, but that does not mean I do not like to party.");
        await this.speak(player, "One is never too old to enjoy the little things in life.");
    }
} 