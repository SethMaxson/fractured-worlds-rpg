import { MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../events/_base-classes/simple-npc";

@MapData({
    id: "somewhere-d2-hotel-room-dragon",
    file: require("../worlds/maps/interiors/somewhere-d2-hotel-room-dragon.tmx"),
    name: "Hotel Somewhere - Dragon Room",
    events: [
        SimpleNpcEvent({
            name: "patron",
            text: "No thank you. Whatever you're selling, I don't need it.",
            graphic: "villager-f2",
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