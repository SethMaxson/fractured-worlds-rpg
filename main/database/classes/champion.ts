import { RpgPlayer } from "@rpgjs/server"
import { Class } from "@rpgjs/database"
import type { ClassOnSet, ClassCanEquip, WeaponInstance, ArmorInstance } from "@rpgjs/database"
import Fire from "../skills/fire";

@Class({  
    name: "Champion",
    description: "You are an emissary of a deity, a devoted servant who has taken up a weighty mantle, and you devoutly pursue a cause that holds you apart from those around you. You have powerful defenses that you share freely with your allies and innocent bystanders, as well as divine power you use to end the threats your deity opposes.",
    skillsToLearn: [
        { level: 5, skill: Fire }
    ],
    statesEfficiency: [],
    elementsEfficiency: []
})
export default class Champion implements ClassOnSet, ClassCanEquip {
    // Called when the class is assigned to the player
    onSet(player: RpgPlayer): void { }

    // Return true if the player can equip the item
    canEquip(item: WeaponInstance | ArmorInstance, player: RpgPlayer): boolean {
        return true;
    }
}