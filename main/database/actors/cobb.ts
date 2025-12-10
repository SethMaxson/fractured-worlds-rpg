import { RpgPlayer, Presets } from "@rpgjs/server";
import { Actor } from "@rpgjs/database";
import Monk from "../classes/monk";

const { MAXHP } = Presets

@Actor({  
    id: "cobb",
    name: "C.O.B.B.",
    description: "An android-class Construct who uses martial arts to Observe Biological Boundaries.",
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
    class: Monk 
})
export default class Cobb {
    onSet(player: RpgPlayer) {
        
    }
}