import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

const identifier = "crew-hamisfore";

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
        this.name = "Hamisfore";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "Heya, kiddo. What d'you need? Is it time to break something?");
    }
} 