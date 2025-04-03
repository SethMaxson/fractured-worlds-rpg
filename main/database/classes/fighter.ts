import { RpgPlayer } from '@rpgjs/server'
import { Class } from '@rpgjs/database'
import type { ClassOnSet, ClassCanEquip, WeaponInstance, ArmorInstance } from '@rpgjs/database'
import Fire from '../skills/fire';

@Class({  
    name: 'Fighter',
    description: 'A great fighter!',
    skillsToLearn: [
        { level: 5, skill: Fire }
    ],
    statesEfficiency: [],
    elementsEfficiency: []
})
export default class Fighter implements ClassOnSet, ClassCanEquip {
    // Called when the class is assigned to the player
    onSet(player: RpgPlayer): void { }

    // Return true if the player can equip the item
    canEquip(item: WeaponInstance | ArmorInstance, player: RpgPlayer): boolean {
        return true;
    }
}