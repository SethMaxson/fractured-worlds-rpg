import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../events/_base-classes/simple-npc";
import TeleportMenuEvent from "../events/special/teleport-menu";
import Berrak from "../events/somewhere/npc/berrak";

@MapData({
    id: "voidspace-layout-1",
    file: require("../worlds/maps/voidspace-layout-01.tmx"),
    name: "Voidspace",
    events: [
        // Berrak,
        // TeleportMenuEvent,
        // SimpleNpcEvent({
        //     name: "Geoffrey Parker",
        //     text: "Heya, friendo.",
        //     graphic: "villager-m1",
        //     moveRandom: true
        // })
    ]
})
export default class VoidspaceLayout1 extends RpgMap {
    // onLoad() {
    //     const spawner = new Spawner(this, MobSpawnList);

    //     setInterval(() => {
    //         const mobs = getMobsOnMapCount(this);
    //         spawner.populate(mobs);
    //     }, 60 * 1000)

    //     spawner.populate({});
    // }
}