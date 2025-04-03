import { MapData, RpgMap } from "@rpgjs/server";

@MapData({
    id: 'vehicle-one-more-day',
    file: require('../worlds/maps/vehicle-one-more-day.tmx'),
})
export default class Simplemap extends RpgMap {
    // onLoad() {
    //     const spawner = new Spawner(this, MobSpawnList);

    //     setInterval(() => {
    //         const mobs = getMobsOnMapCount(this);
    //         spawner.populate(mobs);
    //     }, 60 * 1000)

    //     spawner.populate({});
    // }
}