import { RpgPlayer } from '@rpgjs/server'
import { Item } from '@rpgjs/database'

const hpValue = 15;

@Item({  
    name: 'Healing Potion, Lesser',
    description: `Gives ${hpValue} HP`,
    price: 12,
    hpValue: hpValue,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    // effects: [],
    paramsModifier: {},
    level: 13
})
export default class HealingPotionLesser {
    onAdd(player: RpgPlayer) {

    }

    onUse(player: RpgPlayer) {
        player.hp += hpValue;
    }

    onUseFailed(player: RpgPlayer) {

    }

    onRemove(player: RpgPlayer) {

    }
}