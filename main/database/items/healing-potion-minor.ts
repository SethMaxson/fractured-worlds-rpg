import { RpgPlayer } from '@rpgjs/server'
import { Item } from '@rpgjs/database'

@Item({  
    name: 'Healing Potion, Minor',
    description: 'Gives 5 HP',
    price: 4,
    hpValue: 5,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    // effects: [],
    paramsModifier: {},
    level: 1
})
export default class HealingPotionMinor {
    onAdd(player: RpgPlayer) {

    }

    onUse(player: RpgPlayer) {
        player.hp += 5;
    }

    onUseFailed(player: RpgPlayer) {

    }

    onRemove(player: RpgPlayer) {

    }
}