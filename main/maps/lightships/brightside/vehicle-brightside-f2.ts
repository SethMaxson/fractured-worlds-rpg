import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../../../events/_base-classes/simple-npc";

@MapData({
    id: "vehicle-brightside-f2",
    file: require("../../../worlds/maps/[Lightships]/whaleship/whaleship-f2.tmx"),
    name: "Brightside - Command Deck (F2)",
    events: [
        // SimpleNpcEvent({
        //     name: "Geoffrey Parker",
        //     text: "Heya, friendo.",
        //     graphic: "villager-m1",
        //     moveRandom: true
        // })
    ]
})
export default class FracturedWorldsMap extends RpgMap {
    // onLoad() {
    //     const spawner = new Spawner(this, MobSpawnList);

    //     setInterval(() => {
    //         const mobs = getMobsOnMapCount(this);
    //         spawner.populate(mobs);
    //     }, 60 * 1000)

    //     spawner.populate({});
    // }
}