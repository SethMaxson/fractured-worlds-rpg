import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'ekhaas-nasaar', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-ekhaas-nasaar');
        this.name = "Ekhaas Nasaar";
		this.setComponentsTop(
            Components.text("[Sheriff] {name}", { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"npc_name": "§e[Sheriff] Ekhaas Nasaar",
				"text": "Greetings, citizen.",
				"buttons": [
					{
						"text": "Chat",
						"value": ["chat"]
					},
					{
						"text": "Nevermind."
					}
				]
			},
			{
				"scene_tag": "chat",
				"npc_name": "",
				"text": "You are aware that law and order do not enforce themselves, yes? Crime laughs while you burn my ear with idle chatter.",
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
						"text": "Nevermind."
					}
				]
			},
			{
				"scene_tag": "chat_city",
				"npc_name": "",
				"text": "Ah. A sensible request, though the §1strange gnome§r at the §2Information Center§r may be better suited to answer such questions.",
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
				"text": "That is a vague an inane request. Be more specific, citizen.",
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
				"text": "I am Ekhaas Nasaar - proud §4hobgoblin§r warrior. I stood watch over the ruins of the §3Sarakt§r for decades, preparing for the inevitable return of their arcane tyrany.",
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
				"text": "Three of my descendants survived §4The Fracturing§r - far more than most familes. Doubtless it is because the universe knows they are suited to combat the evils that plague it. My §1granddaughters§r dwell here in §4Somewhere§r, and my §1grandson§r is the commander of the armed forces of a turtle vessel. I have trained each of them since they could hold a blade. You would do well not to cross them.",
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
				"text": "I hail from the nation of §4Prysyaha§r. It was a nation founded on duty, honor, and necessity, not like the petty things that drive other nations.\n\nI dedicated my life to slaying any that would threaten the freedom of any peoples. That oath is not broken just because my world is.",
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
				"text": "It is unwise to deal in rumors. A good warrior knows to share only things that are known.",
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