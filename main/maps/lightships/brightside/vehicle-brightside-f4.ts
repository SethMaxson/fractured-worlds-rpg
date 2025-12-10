import { Direction, MapData, RpgMap } from "@rpgjs/server";
import SimpleNpcEvent from "../../../events/_base-classes/simple-npc";
import TeleportMenuEvent from "../../../events/special/teleport-menu";
import CharacterChange from "../../../events/special/character-change";

@MapData({
    id: "vehicle-brightside-f4",
    file: require("../../../worlds/maps/[Lightships]/whaleship/whaleship-f4.tmx"),
    name: "Brightside - Main Deck (F4)",
    events: [
        TeleportMenuEvent,
        SimpleNpcEvent({
            name: "Todd Jenkins",
            text: "Hi. Hell of a day, huh?",
            graphic: "villager-m1",
            moveRandom: true
        }),
        // CharacterChange({
        //     // displayName: "C.O.B.B.",
        //     name: "character-change-1",
        //     actorID: "cobb",
        //     graphic: "cobb-1",
        //     direction: Direction.Up
        // }),
        // CharacterChange({
        //     // displayName: "C.O.B.B.",
        //     name: "character-change-2",
        //     actorID: "tero",
        //     graphic: "tero-2",
        //     direction: Direction.Up
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