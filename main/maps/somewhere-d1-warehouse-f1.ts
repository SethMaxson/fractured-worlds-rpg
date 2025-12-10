import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../events/_base-classes/simple-npc";

@MapData({
    id: "somewhere-d1-warehouse-f1",
    file: require("../worlds/maps/interiors/somewhere-d1-warehouse.tmx"),
    name: "Warehouse F1",
    events: [
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