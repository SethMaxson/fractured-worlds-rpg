import { RpgPlayer } from '@rpgjs/server'
import { State } from '@rpgjs/database'
import Efficiency from '../../db_manually_curated/efficiency'
import Elements from '../../db_manually_curated/elements'

@State({  
    name: 'Paralyse',
    description: 'The player is paralyzed',
    effects: [],
    // paramsModifier: [],
    statesEfficiency: [],
    elementsEfficiency: [{ rate: Efficiency.VULNERABLE, element: Elements.Lightning }]
})
export default class Paralyse {
    
}