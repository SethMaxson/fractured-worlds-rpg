import { Direction, EventData, RpgPlayer } from '@rpgjs/server'
import ZoneChangeEvent from '../_base-classes/zone-change';

@EventData({
    name: 'omd-f1-to-b1',
})
export default class ZoneChange extends ZoneChangeEvent {
    async onPlayerTouch(player: RpgPlayer) {
        this.teleportPlayer(player, { x: 20, y: 14}, Direction.Right, 0.5);
    }
}