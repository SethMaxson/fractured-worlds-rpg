import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../../../events/_base-classes/simple-npc";

@MapData({
    id: "whaleship-f6-room1",
    file: require("../../../worlds/maps/[Lightships]/whaleship/whaleship-f6-room1.tmx"),
    name: "Brightside - Private Room",
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