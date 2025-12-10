import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../events/_base-classes/simple-npc";

@MapData({
    id: "the-oasis-lounge",
    file: require("../worlds/maps/[Worlds]/the-oasis.tmx"),
    name: "The Oasis",
    events: [
        // SimpleNpcEvent({
        //     name: "cade",
        //     text: "This seems to be working!",
        //     graphic: "nle-cade",
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