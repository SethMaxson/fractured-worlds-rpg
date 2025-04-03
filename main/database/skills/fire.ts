import { RpgPlayer } from '@rpgjs/server'
import { Skill } from '@rpgjs/database'
import { ATK } from '@rpgjs/server/lib/presets'
import Elements from '../../db_manually_curated/elements'

@Skill({  
    name: 'Fire',
    description: 'Shoots a ball of fire',
    spCost: 10,
    power: 100,
    variance: 10,
    hitRate: 1,
    addStates: [],
    removeStates: [],
    elements: [Elements.Fire],
    coefficient: {
        // [ATK]: 2
    }
})
export default class Fire {
    onLearn(player: RpgPlayer) {

    }

    onUse(player: RpgPlayer) {

    }

    onForget(player: RpgPlayer) {

    }
}