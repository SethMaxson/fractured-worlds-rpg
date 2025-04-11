import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'berrak', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-berrak');
        this.name = "Berrak";
		this.setComponentsTop(
            Components.text("[Ship Parts] {name}", { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"scene_tag": "main",
				"npc_name": "§e[Ship Parts] Berrak",
				"text": "What d'ya need?",
				"buttons": [
					{
						"text": "Trade",
						"value": ["main"]
					},
					{
						"text": "Chat",
						"value": ["chat"]
					},
					{
						"text": "Nevermind.",
						"value": ["leaving"]
					}
				]
			},
			{
				"scene_tag": "leaving",
				"npc_name": "",
				"text": "See ya."
			},
			{
				"scene_tag": "chat",
				"npc_name": "",
				"text": "What d'ya wanna talk about?",
				"buttons": [
					{
						"text": "You.",
						"value": ["chat_self"]
					},
					{
						"text": "This city.",
						"value": ["chat_city"]
					},
					{
						"text": "Nevermind.",
						"value": ["main"]
					}
				]
			},
			{
				"scene_tag": "chat_city",
				"npc_name": "",
				"text": "'Course. What'sit you wanna know?",
				"buttons": [
					{
						"text": "Rumors?",
						"value": ["chat_city_rumors"]
					},
					{
						"text": "Nevermind.",
						"value": ["chat"]
					}
				]
			},
			{
				"scene_tag": "chat_self",
				"npc_name": "",
				"text": "I'm §1Berrak§r. I make §4ship parts§r.",
				"buttons": [
					{
						"text": "What are you?",
						"value": ["chat_self_what"]
					},
					{
						"text": "Your family.",
						"value": ["chat_self_family"]
					},
					{
						"text": "Your homeland.",
						"value": ["chat_self_homeland"]
					},
					{
						"text": "Nevermind.",
						"value": ["chat"]
					}
				]
			},
			{
				"scene_tag": "chat_self_what",
				"npc_name": "",
				"text": "A bloke who makes ship parts. S'pose that makes me a smith of some sort.",
				"buttons": [
					{
						"text": "Informative.",
						"value": ["chat_self"]
					}
				]
			},
			{
				"scene_tag": "chat_self_family",
				"npc_name": "",
				"text": "§1My mum§r works at the hotel. I work here. Now you're up to speed.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat_self"]
					}
				]
			},
			{
				"scene_tag": "chat_self_homeland",
				"npc_name": "",
				"text": "S'gone now, so it hardly matters, eh?",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat_city"]
					}
				]
			},
			{
				"scene_tag": "chat_city_rumors",
				"npc_name": "",
				"text": "You want rumors, eh?\n\nI heard a rumor that a bloke who kept annoyin' a local smith spontaneously caught §o\"painful punch in the jaw\"§r disease. Nasty stuff.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat_city"]
					}
				]
			}
		];

		await this.speak(player, "How'sit?");
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 