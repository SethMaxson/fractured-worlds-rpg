import { RpgPlayer } from "@rpgjs/server"
import { Class } from "@rpgjs/database"
import type { ClassOnSet, ClassCanEquip, WeaponInstance, ArmorInstance } from "@rpgjs/database"
import Fire from "../skills/fire";

@Class({  
    name: "Cleric",
    description: "Deities work their will upon the world in infinite ways, and you serve as one of their most stalwart mortal servants. Blessed with divine magic, you live the ideals of your faith, adorn yourself with the symbols of your church, and train diligently to wield your deity’s favored weapon. Your spells might protect and heal your allies, or they might punish foes and enemies of your faith, as your deity wills. Yours is a life of devotion, spreading the teachings of your faith through both word and deed.",
    skillsToLearn: [
        { level: 5, skill: Fire }
    ],
    statesEfficiency: [],
    elementsEfficiency: []
})
export default class Cleric implements ClassOnSet, ClassCanEquip {
    // Called when the class is assigned to the player
    onSet(player: RpgPlayer): void { }

    // Return true if the player can equip the item
    canEquip(item: WeaponInstance | ArmorInstance, player: RpgPlayer): boolean {
        return true;
    }
}