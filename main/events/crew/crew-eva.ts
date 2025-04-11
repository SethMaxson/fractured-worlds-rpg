import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

@EventData({
    name: 'crew-eva', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends CrewmateEvent {
    onInit() {
        this.setGraphic('crew-eva-davis');
        this.name = "Eva Davis";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
		await this.speak(player, "I know the Void Realm is terrible and all, but it feels kind of nice to stare at an oppressive, lightless pit of despair that isn't a DOS prompt.");
		await this.speak(player, "Oh, they probably didn't have DOS on your world, huh? Well, it's sort of like...");
		await this.speak(player, "Never mind. You're probably happier not knowing.");
    }
} 