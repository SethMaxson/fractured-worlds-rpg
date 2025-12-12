import { Direction, MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../../../events/_base-classes/simple-npc";
import CharacterChange from "../../../events/special/character-change";

@MapData({
    id: "whaleship-bar",
    file: require("../../../worlds/maps/[Lightships]/whaleship/whaleship-f4-bar.tmx"),
    name: "Whaleship - Pub",
    events: [
        CharacterChange({
            name: "character-change-1",
            actorID: "cobb",
            graphic: "cobb-1",
            direction: Direction.Down
        }),
        CharacterChange({
            name: "character-change-3",
            actorID: "tero",
            graphic: "tero-2",
            direction: Direction.Down
        })
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