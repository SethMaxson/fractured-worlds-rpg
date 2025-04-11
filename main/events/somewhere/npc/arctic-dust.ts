import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'arctic-dust', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-arctic-dust');
        this.name = "Arctic Dust";
		this.setComponentsTop(
            Components.text("[Blacksmith] {name}", { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"npc_name": "§e[Blacksmith] Arctic Dust",
				"text": "Well met, traveler.",
				"buttons": [
					{
						"text": "Let's trade.",
						"value": ["greeting"]
					},
					{
						"text": "Let's chat.",
						"value": ["chat"]
					},
					{
						"text": "Goodbye.",
						"value": ["leaving"]
					}
				]
			},
			{
				"scene_tag": "leaving",
				"npc_name": "",
				"text": "May the sun bless your afternoons."
			},
			{
				"scene_tag": "chat",
				"npc_name": "",
				"text": "What do you want to talk about, traveler?",
				"buttons": [
					{
						"text": "You",
						"value": ["chat_self"]
					},
					{
						"text": "This city",
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
				"text": "Yes. §2Somewhere§r is a good place. Not as good as my homeland. But still good.",
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
				"text": "You want to talk about me? This is good! I know a lot about that!",
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
				"scene_tag": "chat_city_rumors",
				"npc_name": "",
				"text": "You are going to think old Arctic Dust is crazy, but I never run out of ingots or fuel in this city. I keep using metal and using metal, but, §4after a sleep, I always find the same amount of raw metal§r as I had before all the making things.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat"]
					}
				]
			},
			{
				"scene_tag": "chat_self_what",
				"npc_name": "",
				"text": "I am Arctic Dust, and Arctic Dust is blacksmith. Finest §4tabaxi§r blacksmith in all of §2Decapos§r, as voted by Arctic Dust, haha!",
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
				"text": "My §1heartsong§r fell ill and departed from us more than a hundred moons ago, but I thank the §3Sun Father§r every day for our little cub.\n\nIt is just me and my §1Flower§r now. But if you buy enough from old Arctic Dust, maybe you can be family too, haha!",
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
				"text": "Arctic Dust comes from §2the land of Bitai§r. Beautiful place, blessed by the §3Sun Father§r himself! The afternoon naps were the best in the world. The afternoon naps here are pretty good here too, though they would be better with a sun, ha ha!",
				"buttons": [
					{
						"text": "[back]",
						"value": ["chat_self"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 