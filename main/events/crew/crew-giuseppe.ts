import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

const identifier = "crew-giuseppe";

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
        this.name = "Giuseppe";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "Ciao amico! I do hope we find some colore at our next stop. I'm getting dangerously low on black.");
    }
} 