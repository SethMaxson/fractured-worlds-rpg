import { RpgEvent, EventData, RpgPlayer, RpgMap } from '@rpgjs/server'

@EventData({
    name: 'ship-wheel', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
    }
    async onAction(player: RpgPlayer) {
        const choice = await player.showChoices('Where do you want to go?', [
            { text: "Somewhere", value: "somewhere-district-1" },
            { text: "My ship, the One More Day", value: "lightship-one-more-day" },
            { text: "Actually, I think I'll stay here", value: "none" }
        ],
        {
            talkWith: this
            }
        );
        // await player.showText('I give you 10 gold.', {
        //     talkWith: this
        // })
        if (choice && choice.value != "none") {
            const map = await player.changeMap(choice.value) as RpgMap;
            // map.getEventByName

        }
    }
} 