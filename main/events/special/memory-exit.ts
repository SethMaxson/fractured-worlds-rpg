import { RpgEvent, EventData, RpgPlayer, RpgMap, Components } from '@rpgjs/server'
import TeleportDestinations from '../../lists/teleport-destinations';

@EventData({
    name: 'memory-exit', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends RpgEvent {
    onInit() {
        // this.setGraphic('female');
        this.name = 'Exit Memory';
        // this.posZ = 50;
        // this.setComponentsTop(Components.text('{name}'));
        this.setComponentsTop(Components.text('{name}', {
            fill: '#66ffff'
        }));
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