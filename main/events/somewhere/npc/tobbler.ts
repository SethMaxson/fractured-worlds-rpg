import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import NpcEvent from '../../_base-classes/npc';


@EventData({
    name: 'tobbler', 
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class VillagerEvent extends NpcEvent {
    onInit() {
		super.onInit();
        this.setGraphic('sw-tobbler');
        this.name = "Tobbler";
		this.setComponentsTop(
            Components.text("['Doctor'] {name}", { fill: '#ffee00', fontSize: 12, fontFamily: "Pixelify Sans" } ),
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
				"scene_tag": "tobbler_greeting",
				"npc_name": "§e[Doctor] Tobbler",
				"text": "Hillo!\n\nI sense your problem. You have too many ghosts.",
				"buttons": [
					{
						"text": "Chat",
						"value": ["tobbler_chat"]
					},
					{
						"text": "Treat",
						"value": ["tobbler_greeting"]
					},
					{
						"text": "Nevermind.",
						"value": ["tobbler_leaving"]
					}
				]
			},
			{
				"scene_tag": "tobbler_leaving",
				"npc_name": "",
				"text": "Watch out for ghosts!"
			},
			{
				"scene_tag": "tobbler_chat",
				"npc_name": "",
				"text": "Okay, but this won't cure your ghosts.\n\nWhat do you want to talk about?",
				"buttons": [
					{
						"text": "You.",
						"value": ["tobbler_chat_self"]
					},
					{
						"text": "This city.",
						"value": ["tobbler_chat_city"]
					},
					{
						"text": "Nevermind."
					}
				]
			},
			{
				"scene_tag": "tobbler_chat_city",
				"npc_name": "",
				"text": "Did you know this city is full of ghosts? I bet there are at least two haunting you §lright now!§r",
				"buttons": [
					{
						"text": "Rumors?",
						"value": ["tobbler_chat_city_rumors"]
					},
					{
						"text": "Nevermind.",
						"value": ["tobbler_chat"]
					}
				]
			},
			{
				"scene_tag": "tobbler_chat_self",
				"npc_name": "",
				"text": "Fun fact: I am not a ghost!",
				"buttons": [
					{
						"text": "What are you?",
						"value": ["tobbler_chat_self_what"]
					},
					{
						"text": "Your family.",
						"value": ["tobbler_chat_self_family"]
					},
					{
						"text": "Your homeland.",
						"value": ["tobbler_chat_self_homeland"]
					},
					{
						"text": "Nevermind.",
						"value": ["tobbler_chat"]
					}
				]
			},
			{
				"scene_tag": "tobbler_chat_self_what",
				"npc_name": "",
				"text": "I am a doctor. I am also slightly frightened of ghosts. Only slightly.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tobbler_chat_self"]
					}
				]
			},
			{
				"scene_tag": "tobbler_chat_self_family",
				"npc_name": "",
				"text": "I had several thousand brothers and sisters, but they perished in the fracturing, so they are all ghosts now.\n\nNo matter how many times I ask, they refuse to stop haunting me.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tobbler_chat_self"]
					}
				]
			},
			{
				"scene_tag": "tobbler_chat_self_homeland",
				"npc_name": "",
				"text": "I came from a luscious, slimey swamp that was ghost-free. Its many slimes were a natural ghost-repellant, you see.\n\nRhyming also repels ghosts.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tobbler_chat_self"]
					}
				]
			},
			{
				"scene_tag": "tobbler_chat_city_rumors",
				"npc_name": "",
				"text": "Oh, yes! I have a very juicy rumor for you!\n\n§o§nThe frog pauses to lick his eye.§r\n\nThis town has many ghosts. You'll probably become one soon, based on the ghost that currently seems to be nibbling on your kidneys.",
				"buttons": [
					{
						"text": "[back]",
						"value": ["tobbler_chat_city"]
					}
				]
			}
		];
        
        await this.showTextFromMinecraftDialog(player, scenes);
    }
} 