import { RpgEvent, EventData, RpgPlayer, Move, Direction } from '@rpgjs/server'
import ZoneChangeEvent from '../_base-classes/zone-change';

@EventData({
    name: 'omd-b1-to-f1',
})
export default class ZoneChange extends ZoneChangeEvent {
    async onPlayerTouch(player: RpgPlayer) {
        this.teleportPlayer(player, { x: 11, y: 16}, Direction.Left, 0.5);
    }
} 