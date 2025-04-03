import { RpgEvent, EventData, RpgPlayer, RpgMap, Components, ShapePositioning } from '@rpgjs/server'
import TeleportDestinations from '../../lists/teleport-destinations';
import { HitBox, HitObject, HitType } from '@rpgjs/types';

@EventData({
    name: 'teleport-menu', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('ancient-crystal');
        this.name = 'Teleport';
        // this.posZ = 50;
        // this.setComponentsTop(Components.text('{name}'));
        this.setComponentsTop(
            Components.text('{name}', { fill: '#66ffff', fontSize: 12, fontFamily: "Arial Black" } ),
            {
                width: 64,
                height: 20,
                marginTop: 5,
           }
        );
        
        // const shape = this.getCurrentMap()?.createShape(
        //     {
        //         name: "dummy",
        //         x: this.hitbox.pos.x,
        //         y: this.hitbox.pos.y,
        //         width: 32,
        //         height: 32,
        //         hitType: HitType.Box,
        //         properties: {
        //             color: '#ff0000',
        //             opacity: 0.5
        //         }
        //     } as HitBox
        // );
        // if (!shape) {
        //     return;
        // }
        // this.attachShape(shape);
        // shape.positioning = ShapePositioning.Center;
    }
    async onAction(player: RpgPlayer) {
        const filteredOptions = TeleportDestinations.filter(op => op.value != player.getCurrentMap()?.id)

        const choice = await player.showChoices(
            'Where do you want to go?',
            filteredOptions,
            { talkWith: this }
        );
        if (choice && choice.value != "none") {
            const map = await player.changeMap(choice.value) as RpgMap;
            // map.getEventByName
        }
    }
} 