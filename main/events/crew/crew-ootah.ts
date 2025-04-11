import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

const identifier = "crew-ootah";

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
        this.name = "Ootah";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "Ugh... I'm dyin' from not-enough-candy disease...");
		await this.speak(player, "Howcome we ain't made it to candy world yet? Ya don't fink somefin' happened to it, do ya?");
    }
} 