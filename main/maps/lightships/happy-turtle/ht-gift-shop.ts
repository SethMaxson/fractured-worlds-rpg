import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../../../events/_base-classes/simple-npc";

@MapData({
    id: "ht-gift-shop",
    file: require("../../../worlds/maps/[Lightships]/happy-turtle/happy-turtle-gift-shop.tmx"),
    name: "Happy Turtle - Gift Shop/Entrance",
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