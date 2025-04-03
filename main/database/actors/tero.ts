import { RpgPlayer, Presets } from '@rpgjs/server'
import Fighter from '../classes/fighter'
import { Actor } from '@rpgjs/database'

const { MAXHP } = Presets

@Actor({  
    name: 'Tero',
    description: 'A talented warrior who channels the elements.',
    initialLevel: 1,
    finalLevel: 20,
    expCurve: {
        basis: 1000,
        extra: 0,
        accelerationA: 0,
        accelerationB: 0
    },
    parameters: {
        [MAXHP]: {
            start: 56,
            end: 10000
        }
    },
    startingEquipment: [],
    class: Fighter 
})
export default class Tero {
    onSet(player: RpgPlayer) {
        
    }
}