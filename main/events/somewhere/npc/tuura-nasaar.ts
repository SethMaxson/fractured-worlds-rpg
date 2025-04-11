import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'tuura-nasaar', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-tuura-nasaar');
        this.name = "Tuura Nasaar";
		this.setComponentsTop(
            Components.text("[Chef] {name}", { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"scene_tag": "tuura_nasaar_greeting",
				"npc_name": "§e[Chef] Tuura Nasaar",
				"text": "The hells are you doing in my kitchen? You're too foul smelling and misshapen to be an ingredient.\n\nLeave, unless you want to volunteer to be the roast pig for Table 6!",
				"buttons": [
					{
						"text": "Trade",
						"value": ["tuura_nasaar_greeting"]
					},
					{
						"text": "Chat",
						"value": ["tuura_nasaar_chat"]
					},
					{
						"text": "Nevermind.",
						"value": ["tuura_nasaar_leaving"]
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_leaving",
				"npc_name": "",
				"text": "§oNareshti§r."
			},
			{
				"scene_tag": "tuura_nasaar_chat",
				"npc_name": "",
				"text": "I can't help but notice you are not gone yet. Will you leave faster if I answer your inane questions?\n\nFine. What do you want to annoy me about?",
				"buttons": [
					{
						"text": "You.",
						"value": ["tuura_nasaar_chat_self"]
					},
					{
						"text": "This city.",
						"value": ["tuura_nasaar_chat_city"]
					},
					{
						"text": "Nevermind."
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_chat_city",
				"npc_name": "",
				"text": "What do I look like, §okhuylo§r? The city council?",
				"buttons": [
					{
						"text": "Rumors?",
						"value": ["tuura_nasaar_chat_city_rumors"]
					},
					{
						"text": "Nevermind.",
						"value": ["tuura_nasaar_chat"]
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_chat_self",
				"npc_name": "",
				"text": "§oTy mabutʹ zhartuyesh!§r If you are trying to make me like you, you are barking in the wrong forest!\n\nWhat?",
				"buttons": [
					{
						"text": "What are you?",
						"value": ["tuura_nasaar_chat_self_what"]
					},
					{
						"text": "Your family.",
						"value": ["tuura_nasaar_chat_self_family"]
					},
					{
						"text": "Your homeland.",
						"value": ["tuura_nasaar_chat_self_homeland"]
					},
					{
						"text": "Nevermind.",
						"value": ["tuura_nasaar_chat"]
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_chat_self_what",
				"npc_name": "",
				"text": "A chef.\n\nIf you were asking about my people, I am an §ooplot§r. I think the outsider term is §4\"hobgoblin.\"§r",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tuura_nasaar_chat_self"]
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_chat_self_family",
				"npc_name": "",
				"text": "Much of my family survived §4The Fracturing§r. My §1grandmother§r is the sheriff - it was the closest thing to a millitary for her to command here. My §1baby sister§r works with the admirably un-chatty man who makes chairs, and my §1elder brother§r lives on a §2flying turtle§r. Apparently his job is to ruin anyone who gets too testy on the turtle. I like my kitchen, but I almost envy him getting to draw so much blood.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tuura_nasaar_chat_self"]
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_chat_self_homeland",
				"npc_name": "",
				"text": "§4Prysyaha§r. That's where I come from. It had giant mountains, sweeping plains, and I could legally kill anyone who annoyed me... I miss that.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tuura_nasaar_chat_city"]
					}
				]
			},
			{
				"scene_tag": "tuura_nasaar_chat_city_rumors",
				"npc_name": "",
				"text": "§1That little §odyvak§r who works at the dockhouse is too nosy for someone so boot-sized. I've seen him slinking around in the shadows were he aughtn't be.\n\nIf I catch him following §ome§r, I'm going to try out that orcish recipe for Halfling Pot Pie.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tuura_nasaar_chat_city"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 