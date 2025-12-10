import { RpgPlayer } from "@rpgjs/server"
import { Class } from "@rpgjs/database"
import type { ClassOnSet, ClassCanEquip, WeaponInstance, ArmorInstance } from "@rpgjs/database"
import Fire from "../skills/fire";

@Class({  
    name: "Kineticist",
    description: "The power of the elements flows from within you. Roaring fire, pure water, fleeting air, steadfast earth, twisting wood, slicing metal. A kinetic gate inextricably tied to your body channels power directly from the elemental planes, causing elements to leap to your hand, whirl around your body, and blast foes at your whim. As your connection to the planes grows, you attain true mastery over your chosen elements.",
    skillsToLearn: [
        { level: 5, skill: Fire }
    ],
    statesEfficiency: [],
    elementsEfficiency: []
})
export default class Kineticist implements ClassOnSet, ClassCanEquip {
    // Called when the class is assigned to the player
    onSet(player: RpgPlayer): void { }

    // Return true if the player can equip the item
    canEquip(item: WeaponInstance | ArmorInstance, player: RpgPlayer): boolean {
        return true;
    }
}