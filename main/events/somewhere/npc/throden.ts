import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';
import HealingPotionMinor from '../../../database/items/healing-potion-minor';
import HealingPotionLesser from '../../../database/items/healing-potion-lesser';
import HealingPotionModerate from '../../../database/items/healing-potion-moderate';
import HealingPotionGreater from '../../../database/items/healing-potion-greater';
import HealingPotionMajor from '../../../database/items/healing-potion-major';

@EventData({
    name: 'throden', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-throden');
        this.name = "Shopkeeper";
        // this.setComponentsTop(Components.text('{name}'));
        this.setComponentsTop(Components.text('{name}', {
            fill: '#ffee00'
        }));
    }
    async onAction(player: RpgPlayer) {
        await this.speak(player, "Welcome, welcome! What can I do you for?");
        await player.callShop(
            [
                HealingPotionMinor,
                HealingPotionLesser,
                HealingPotionModerate,
                HealingPotionGreater,
                HealingPotionMajor
            ]
        );
    }
} 