import { RpgPlayer } from '@rpgjs/server'
import { Item } from '@rpgjs/database'

const hpValue = 70;

@Item({  
    name: 'Healing Potion, Major',
    description: `Gives ${hpValue} HP`,
    price: 5000,
    hpValue: hpValue,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    // effects: [],
    paramsModifier: {},
    level: 18
})
export default class HealingPotionMajor {
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