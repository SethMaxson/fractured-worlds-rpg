import { RpgEvent, EventData, RpgPlayer, Move, Direction } from '@rpgjs/server'
import NpcEvent from './../_base-classes/npc';

interface ICharacterChangeOptions {
    name: string,
    displayName?: string,
    graphic: string,
    actorID: string,
    direction?: Direction,
    moveRandom?: boolean,
    frequency?: number,
    speed?: number
}

export default function CharacterChange(options: ICharacterChangeOptions): object {
    @EventData({
        name: options.displayName || options.name, 
        hitbox: {
            width: 32,
            height: 16
        }
    })
    class CharacterChange extends NpcEvent {
        options: ICharacterChangeOptions;
        onInit() {
            super.onInit();
            this.speed = options.speed || 1;
            this.frequency = options.frequency || 100;
            this.options = options;
            this.changeDirection(options.direction || Direction.Down);
            this.setGraphic(options.graphic);
            this.setActor(options.actorID);
            if (options.moveRandom) this.infiniteMoveRoute([ Move.tileRandom() ]);
        }
        async onAction(player: RpgPlayer) {
            let choice = await this.speakYesOrNo(player, `Play as ${this.name}?`, "");
            if (choice) {
                // player.takePossessionOf(this);
                player.setActor(this.options.actorID);
                player.setGraphic(this.options.graphic);
                player.name = this.name;
            }
        }
    }
    return CharacterChange;
}