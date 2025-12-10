import { RpgPlayer } from "@rpgjs/server"
import { Class } from "@rpgjs/database"
import type { ClassOnSet, ClassCanEquip, WeaponInstance, ArmorInstance } from "@rpgjs/database"
import Fire from "../skills/fire";

@Class({  
    name: "Sorcerer",
    description: "You didn't choose to become a spellcaster—you were born one. There's magic in your blood. Perhaps a divine influence blessed one of your ancestors, a forebear communed with an ancient, primordial entity, or a powerful occult ritual performed long ago influenced your lineage. Self-reflection and study allow you to refine your inherent magical skills and unlock new, more powerful abilities. The power in your blood carries a risk, however, and you constantly face the choice of whether you'll rise to become a master spellcaster or fall into destruction.",
    skillsToLearn: [
        { level: 5, skill: Fire }
    ],
    statesEfficiency: [],
    elementsEfficiency: []
})
export default class Sorcerer implements ClassOnSet, ClassCanEquip {
    // Called when the class is assigned to the player
    onSet(player: RpgPlayer): void { }

    // Return true if the player can equip the item
    canEquip(item: WeaponInstance | ArmorInstance, player: RpgPlayer): boolean {
        return true;
    }
}