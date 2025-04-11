import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';

@EventData({
    name: 'mem-chesire-cat-1', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('wonderland-chesire-cat');
        this.name = "Chesire Cat";
        // this.setComponentsTop(Components.text('{name}', {
        //     fill: '#ffee00'
        // }));
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, "I'm a freaky, eldritch abomination that happens to resemble a cat. Isn't that strange and upsetting?");
        await this.speak(player, "Don't worry about it too much, kiddo.");
    }
} 