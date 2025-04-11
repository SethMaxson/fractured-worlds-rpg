import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'dread', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-dread');
        this.name = "Dread";
        // this.setComponentsTop(Components.text('{name}', {
        //     fill: '#ffee00'
        // }));
		this.setComponentsTop(
            Components.text('[Surgeon] {name}', { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
            {
                width: 64,
                height: 16,
                marginTop: 5,
				marginLeft: 0,
				marginRight: 0,
				marginBottom: 10
           }
        );
    }
    async onAction(player: RpgPlayer) {
        const scenes = [
			{
				"scene_tag": "dread_greeting",
				"npc_name": "§e[Surgeon] Dread",
				text: "...",
				"buttons": [
					// {
					// 	text: "I need medical assistance.",
					// 	value: ["dread_greeting"]
					// },
					{
						text: "Let's chat.",
						value: ["dread_chat"]
					},
					{
						text: "Nevermind."
					}
				]
			},
			{
				"scene_tag": "dread_chat",
				text: "...what?",
				"buttons": [
					{
						text: "About you...",
						value: ["dread_chat_self"]
					},
					{
						text: "About this city...",
						value: ["dread_chat_city"]
					},
					{
						text: "Nevermind.",
						// value: ["dread_greeting"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_city",
				text: "What of it?",
				"buttons": [
					{
						text: "Heard any good rumors?",
						value: ["dread_chat_city_rumors"]
					},
					{
						text: "Nevermind.",
						value: ["dread_chat"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_self",
				text: "...",
				"buttons": [
					{
						text: "What are you?",
						value: ["dread_chat_self_what"]
					},
					{
						text: "Your family.",
						value: ["dread_chat_self_family"]
					},
					{
						text: "Your homeland.",
						value: ["dread_chat_self_homeland"]
					},
					{
						text: "Nevermind.",
						value: ["dread_chat"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_self_what",
				text: "...I am a surgeon.",
				"buttons": [
					{
						text: "[continue]",
						value: ["dread_chat_self"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_self_family",
				text: "I am a §4tiefling§r. I do not have one of those.",
				"buttons": [
					{
						text: "What do you mean?",
						value: ["dread_chat_self_family_2"]
					},
					{
						text: "[back]",
						value: ["dread_chat_self"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_self_homeland",
				text: "...my homeland was evil. \n\nI do not miss it. I simply continue my work here instead.",
				"buttons": [
					{
						text: "[back]",
						value: ["dread_chat_self"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_city_rumors",
				text: "The small reporter is loud and annoying, but she investigates well. Her paper is a surprisingly good place to learn which people need... surgery.",
				"buttons": [
					{
						text: "[back]",
						value: ["dread_chat_city"]
					}
				]
			},
			{
				"scene_tag": "dread_chat_self_family_2",
				text: "Whoever sired me did not wish to raise me. Perhaps I was better off without knowing such pitiful creatures.",
				"buttons": [
					{
						text: "[back]",
						value: ["dread_chat_self"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 