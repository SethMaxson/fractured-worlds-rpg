import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../_base-classes/npc';

@EventData({
    name: 'nle-cade', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
        this.setGraphic('nle-cade');
        this.name = "Cade";
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
    async onAction(player: RpgPlayer) {
        if (player.name == "Tero") {
            await this.speak(player, "Hello, Tero! My day is always that much brighter whenever you're around.");
            await this.speak(player, "Oh, um... not in a weird way... I just meant that you're a wonderful friend and one of the best people I've ever known.");
            await this.speak(player, "The sputtering didn't really help, did it? No. I suppose it wouldn't.");
            await this.speak(player, "*muttering* Why am I so bad at this? I swear I was less nervous when I faced that ice dragon...");
            await this.speak(player, "Just ignore me, Tero. And stay safe out there, alright? You mean the world to me... I mean to all of us.");
        } else {
            await this.speak(player, "Hail, friend! It's wonderful to see you again.");
        }
    }
} 