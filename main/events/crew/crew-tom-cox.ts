import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

const identifier = "crew-tom-cox";

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
        this.name = "Tom Cox";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "This whole Voidspace thing is far out in, like, a bad way, man. Decidedly ungroovy.");
    }
} 