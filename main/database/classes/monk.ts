import { RpgPlayer } from "@rpgjs/server"
import { Class } from "@rpgjs/database"
import type { ClassOnSet, ClassCanEquip, WeaponInstance, ArmorInstance } from "@rpgjs/database"
import Fire from "../skills/fire";

@Class({  
    name: "Monk",
    description: "The strength of your fist flows from your mind and spirit. You seek perfection, honing your body into a flawless instrument and your mind into an orderly bastion of wisdom. You're a fierce combatant renowned for martial arts skills and combat stances that grant you unique fighting moves. While the challenge of mastering many fighting styles drives you to great heights, you also enjoy meditating on philosophical questions and discovering new ways to obtain peace and enlightenment.",
    skillsToLearn: [
        { level: 5, skill: Fire }
    ],
    statesEfficiency: [],
    elementsEfficiency: []
})
export default class Monk implements ClassOnSet, ClassCanEquip {
    // Called when the class is assigned to the player
    onSet(player: RpgPlayer): void { }

    // Return true if the player can equip the item
    canEquip(item: WeaponInstance | ArmorInstance, player: RpgPlayer): boolean {
        return true;
    }
}