import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'
import NpcEvent from './npc';

export default function SimpleNpcEvent(options: {
    text: string | string[],
    name: string,
    displayName?: string,
    graphic: string,
    moveRandom?: boolean,
    frequency?: number,
    speed?: number
}): object {
    @EventData({
        name: options.displayName || options.name, 
        hitbox: {
            width: 32,
            height: 16
        }
    })
    class SimpleNpcEvent extends NpcEvent {
        onInit() {
            super.onInit();
            this.speed = options.speed || 1;
            this.frequency = options.frequency || 100;
            this.setGraphic(options.graphic);
            if (options.moveRandom) this.infiniteMoveRoute([ Move.tileRandom() ]);
        }
        async onAction(player: RpgPlayer) {
            let text = options.text;
            if (typeof text == 'string') text = [text];
            for (let msg of text) {
                await this.speak(player, msg);
                // await player.showText(msg, {
                //     talkWith: this
                // });
            }
        }
    }
    return SimpleNpcEvent;
}