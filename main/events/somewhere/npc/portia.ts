import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'portia', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-portia');
        this.name = "Portia 'Jamjar' Fiddlewick";
		this.setComponentsTop(
            Components.text('[Journalist] {name}', { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"scene_tag": "portia_greeting",
				"npc_name": "§ePortia 'Jamjar' Fiddlewick",
				"text": "Hey, Mac. Got a scoop for me?",
				"buttons": [
					{
						"text": "What's the latest?",
						"value": ["portia_chat_city_rumors"]
					},
					{
						"text": "Let's chat.",
						"value": ["portia_chat"]
					},
					{
						"text": "Goodbye.",
						"value": ["portia_leaving"]
					}
				]
			},
			{
				"scene_tag": "portia_leaving",
				"text": "Don't be a stranger!",
				"buttons": []
			},
			{
				"scene_tag": "portia_chat",
				"npc_name": "",
				"text": "I'm always down for a good lipflap. What's the word?",
				"buttons": [
					{
						"text": "You",
						"value": ["portia_chat_self"]
					},
					{
						"text": "This city",
						"value": ["portia_chat_city"]
					},
					{
						"text": "Nevermind.",
						"value": ["portia_greeting"]
					}
				]
			},
			{
				"scene_tag": "portia_chat_city",
				"npc_name": "",
				"text": "It's a pretty odd town, right? That's fine by me. Lots of weirdos means lots of news.",
				"buttons": [
					{
						"text": "Rumors?",
						"value": ["portia_chat_city_rumors"]
					},
					{
						"text": "Nevermind.",
						"value": ["portia_chat"]
					}
				]
			},
			{
				"scene_tag": "portia_chat_self",
				"npc_name": "",
				"text": "Hey! I'm the one who does interviews, Mac!\n\nEh, a little seltzer adds kick to the spuds. What do you wanna know?",
				"buttons": [
					{
						"text": "What are you?",
						"value": ["portia_chat_self_what"]
					},
					{
						"text": "Your family.",
						"value": ["portia_chat_self_family"]
					},
					{
						"text": "Your homeland.",
						"value": ["portia_chat_self_homeland"]
					},
					{
						"text": "Nevermind.",
						"value": ["portia_chat"]
					}
				]
			},
			{
				"scene_tag": "portia_chat_city_rumors",
				"text": "Why're you asking me directly? You too cheap to buy my §o§lfree§r paper or something?\n\nWait... You know your letters, right? If not, scratch my little outburst there.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["portia_chat"]
					}
				]
			},
			{
				"scene_tag": "portia_chat_self_what",
				"text": "I'm Portia Fiddlewick, but some of my old buddies took to calling me 'Jamjar' during the war. Don't ask why; you don't wanna know.\n\nI'm a reporter now. I'm smaller than most folk, so it's real easy for me to creep up on mooks and catch 'em red handed. Makes for great reading.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["portia_chat_self"]
					}
				]
			},
			{
				"scene_tag": "portia_chat_self_family",
				"text": "Don't got a blood family, but who needs one, right Mac? All my readers are family!",
				"buttons": [
					{
						"text": "[back]",
						"value": ["portia_chat_self"]
					}
				]
			},
			{
				"scene_tag": "portia_chat_self_homeland",
				"text": "That story's hardly worth telling, Mac. I grew up in a backwater hole where nothing ever happened. Joined up with the mercs to feed myself. Retired early on account of how good they pay if you survive.\n\nBooooring! Now here? Here's there's more weirdos than you can shake a stick at, Mac. That's the cat's nightcap.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["portia_chat_self"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 