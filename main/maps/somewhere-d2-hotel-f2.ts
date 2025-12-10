import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../events/_base-classes/simple-npc";

@MapData({
    id: "somewhere-d2-hotel-f2",
    file: require("../worlds/maps/interiors/somewhere-d2-hotel-f2.tmx"),
    name: "Hotel Somewhere F2",
    events: [
        // SimpleNpcEvent({
        //     name: "Geoffrey Parker",
        //     text: "Heya, friendo.",
        //     graphic: "villager-m1",
        //     moveRandom: true
        // })
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