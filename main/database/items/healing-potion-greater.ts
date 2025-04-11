import { RpgPlayer } from '@rpgjs/server'
import { Item } from '@rpgjs/database'

const hpValue = 50;

@Item({  
    name: 'Healing Potion, Greater',
    description: `Gives ${hpValue} HP`,
    price: 400,
    hpValue: hpValue,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    // effects: [],
    paramsModifier: {},
    level: 12
})
export default class HealingPotionGreater {
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