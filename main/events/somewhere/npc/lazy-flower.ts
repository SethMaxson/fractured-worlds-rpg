import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'lazy-flower', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-lazy-flower');
        this.name = "Lazy Flower";
		this.setComponentsTop(
            Components.text("[Shipwright] {name}", { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"scene_tag": "lazy_flower_greeting",
				"npc_name": "§e[Shipwright] Lazy Flower",
				"text": "Hiya, friend!",
				"buttons": [
					{
						"text": "Let's trade.",
						"value": ["lazy_flower_greeting"]
					},
					{
						"text": "Let's chat.",
						"value": ["lazy_flower_chat"]
					},
					{
						"text": "Goodbye.",
						"value": ["lazy_flower_leaving"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_leaving",
				"npc_name": "",
				"text": "Bye! May the sun bless your afternoons!"
			},
			{
				"scene_tag": "lazy_flower_chat",
				"npc_name": "",
				"text": "Ooh, is it time to dish? Do you have any good travel stories for me?\n\nOh, you want me to do the dishing? That's not as fun. Still pretty fun, though!",
				"buttons": [
					{
						"text": "You",
						"value": ["lazy_flower_chat_self"]
					},
					{
						"text": "This city",
						"value": ["lazy_flower_chat_city"]
					},
					{
						"text": "Nevermind.",
						"value": ["lazy_flower_greeting"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_chat_city",
				"npc_name": "",
				"text": "§2Somewhere§r is so weird. It keeps changing, and there are people from so many worlds that sound so different than where I grew up. I love it!",
				"buttons": [
					{
						"text": "Rumors?",
						"value": ["lazy_flower_chat_city_rumors"]
					},
					{
						"text": "Nevermind.",
						"value": ["lazy_flower_chat"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_chat_self",
				"npc_name": "",
				"text": "You want to talk about me? Okay, but only if you tell me about all the sparkly worlds you've visited later, okay?",
				"buttons": [
					{
						"text": "What are you?",
						"value": ["lazy_flower_chat_self_what"]
					},
					{
						"text": "Your family.",
						"value": ["lazy_flower_chat_self_family"]
					},
					{
						"text": "Your homeland.",
						"value": ["lazy_flower_chat_self_homeland"]
					},
					{
						"text": "Nevermind.",
						"value": ["lazy_flower_chat"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_chat_city_rumors",
				"npc_name": "",
				"text": "Sometimes I hear §4weird little feet§r running around when most people are asleep. Do you think that has anything to do with how supplies keep appearing in my §ododa§r's shop?",
				"buttons": [
					{
						"text": "[back]",
						"value": ["lazy_flower_chat_city"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_chat_self_what",
				"npc_name": "",
				"text": "An optimist? Oh, you mean, like, my species? I'm a §4tabaxi§r, but I think a lot of people call us §4catfolk§r. \"Catfolk\" is descriptive and all, but... it's a little plain, right? Tabaxi is §oway§r better.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["lazy_flower_chat_self"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_chat_self_family",
				"npc_name": "",
				"text": "My §o§1doda§r runs the forge, and I can tell he loves it. I'm glad he can keep doing what he loves, even at the end of world!\n\nMy §o§1madu§r died when I was little, so it's just me and my §ododa§r.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["lazy_flower_chat_self"]
					}
				]
			},
			{
				"scene_tag": "lazy_flower_chat_self_homeland",
				"npc_name": "",
				"text": "I grew up in the §2City of Canyon Winds§r. It was super warm and sunny - great for napping, but I like it here, too. I get to meet a lot of really strange people, and I get to hear about all kinds of really fun sounding places.\n\nI would §okill§r for a §3Soothebrick§r, though. If you find any–§owhat's the Common term again?§r Catnip! If you find any catnip, I will be your best friend. §lI would help you hide a body§r for some catnip.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["lazy_flower_chat_self"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 