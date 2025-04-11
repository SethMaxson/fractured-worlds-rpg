import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

const identifier = "crew-tommy";

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
        this.name = "Tommy";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "Hey dude! How's it hangin'?");
		await this.speak(player, "Do you think the next world will have snacks?");
    }
} 