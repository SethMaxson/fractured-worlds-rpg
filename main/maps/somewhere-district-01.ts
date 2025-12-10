import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../events/_base-classes/simple-npc";
import TeleportMenuEvent from "../events/special/teleport-menu";
import Berrak from "../events/somewhere/npc/berrak";

@MapData({
    id: "somewhere-district-01",
    file: require("../worlds/maps/somewhere-district-1.tmx"),
    name: "Somewhere, District 1",
    events: [
        Berrak,
        TeleportMenuEvent,
        SimpleNpcEvent({
            name: "Geoffrey Parker",
            text: "Heya, friendo.",
            graphic: "villager-m1",
            moveRandom: true
        })
    ]
})
export default class FracturedWorldsMapEntry extends RpgMap {
    // onLoad() {
    //     const spawner = new Spawner(this, MobSpawnList);

    //     setInterval(() => {
    //         const mobs = getMobsOnMapCount(this);
    //         spawner.populate(mobs);
    //     }, 60 * 1000)

    //     spawner.populate({});
    // }
}