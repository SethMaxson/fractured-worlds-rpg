import { RpgPlayer } from '@rpgjs/server'
import { Item } from '@rpgjs/database'

const hpValue = 25;

@Item({  
    name: 'Healing Potion, Moderate',
    description: `Gives ${hpValue} HP`,
    price: 50,
    hpValue: hpValue,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    // effects: [],
    paramsModifier: {},
    level: 16
})
export default class HealingPotionModerate {
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