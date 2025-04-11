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
				"scene_tag": "greeting",
				"npc_name": "§e[Jeweler] Deldric Helcral",
				"text": "Hail, customer! \n\nTake a look around, and give me or me §1wee assistant§r a shout if somethin' strikes yer fancy.",
				"buttons": [
					{
						"text": "Trade",
						"value": ["greeting"]
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
				"text": "'Til next time."
			},
			{
				"scene_tag": "chat",
				"npc_name": "",
				"text": "It's small talk yer after, eh? Me wit's not near as sharp as the cuts on me gems, but I'll oblige ya.",
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
						"value": ["greeting"]
					}
				]
			},
			{
				"scene_tag": "chat_city",
				"npc_name": "",
				"text": "Hel– I mean, heck of a town, innit? I'd have been too young to get me own shop back home, but nobody s'much as bats an eye here.",
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
				"text": "Me name's §1Deldric§r. I come from the proud house of §1Helcral§r in the mighty kingdom of §2Bolderhal§r. And before ya go judgin' me beard, ye should know I'm still a few months shy of my twentieth year. It'll grow in.",
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
				"text": "I'm the jeweler 'round here. And if yer one o' them that hasn't seen a §4dwarf§r before, I be one.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat_self"]
					}
				]
			},
			{
				"scene_tag": "chat_self_family",
				"npc_name": "",
				"text": "Me gran, gramps, and mam all went out fightin' orcs. Me pap and brothers all vanished in §4The Fracturin'§r. I've no doubts they're all singin' and sharin' mead with the ancestors now.\n\nThe wee one o'er there, §1Saélihn§r, lost her folks in The Fracturin' too. She did nae have anybody to look after her when she first showed up, so she's been me little sister ever since.",
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
				"text": "Me name's §1Deldric§r. I come from the proud house of §1Helcral§r in the mighty kingdom of §2Bolderhal§r. And before ya go judgin' me beard, ye should know I'm still a few months shy of my twentieth year. It'll grow in.",
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
				"text": "I'm nae the sort who likes to talk behind folks' backs, but if I had to say somethin' was fishy, I'd say it's the info from that §1Berty§r guy. Near everythin' out his mouth seems made up on the spot. I'm nae sure he even realizes how much of a loon he sounds.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat_city"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 