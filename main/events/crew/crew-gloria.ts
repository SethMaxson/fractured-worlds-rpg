import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

const identifier = "crew-gloria";

@EventData({
    name: identifier, 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends CrewmateEvent {
    onInit() {
        this.setGraphic(identifier);
        this.name = "Gloria Molloy";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "*Gloria appears to be staring at a photo, but she quickly puts it away when she notices you.*");
		await this.speak(player, "Oh, hey. Did you need something?");
    }
} 