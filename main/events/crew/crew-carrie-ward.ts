import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'
import CrewmateEvent from '../_base-classes/crewmate';

@EventData({
    name: 'crew-carrie-ward', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends CrewmateEvent {
    onInit() {
        this.setGraphic('crew-carrie-ward');
        this.name = "Carrie Ward";
		super.onInit();
    }
    async onAction(player: RpgPlayer) {
        const scenes = [
			{
				"scene_tag": "greeting",
				text: "Hail, friend! How may I assist you?",
				"buttons": [
					{
						text: "Let's chat.",
						value: ["chat"]
					},
					{
						text: "Goodbye."
					}
				]
			},
			{
				"scene_tag": "chat",
				text: "...what?",
				"buttons": [
					{
						text: "About you...",
						value: ["chat_self"]
					},
					{
						text: "About this city...",
						value: ["chat_city"]
					},
					{
						text: "Nevermind.",
						// value: ["greeting"]
					}
				]
			},
			{
				"scene_tag": "chat_city",
				text: "What of it?",
				"buttons": [
					{
						text: "Rumors?",
						value: ["chat_city_rumors"]
					},
					{
						text: "Nevermind.",
						value: ["chat"]
					}
				]
			},
			{
				"scene_tag": "chat_self",
				text: "...",
				"buttons": [
					{
						text: "What are you?",
						value: ["chat_self_what"]
					},
					{
						text: "Your family.",
						value: ["chat_self_family"]
					},
					{
						text: "Your homeland.",
						value: ["chat_self_homeland"]
					},
					{
						text: "Nevermind.",
						value: ["chat"]
					}
				]
			},
			{
				"scene_tag": "chat_self_what",
				text: "...I am a surgeon.",
				"buttons": [
					{
						text: "[back]",
						value: ["chat_self"]
					}
				]
			},
			{
				"scene_tag": "chat_self_family",
				text: "I am a §4tiefling§r. I do not have one of those.",
				"buttons": [
					{
						text: "What do you mean?",
						value: ["chat_self_family_2"]
					},
					{
						text: "[back]",
						value: ["chat_self"]
					}
				]
			},
			{
				"scene_tag": "chat_self_homeland",
				text: "...my homeland was evil. \n\nI do not miss it. I simply continue my work here instead.",
				"buttons": [
					{
						text: "[back]",
						value: ["chat_self"]
					}
				]
			},
			{
				"scene_tag": "chat_city_rumors",
				text: "The small reporter is loud and annoying, but she investigates well. Her paper is a surprisingly good place to learn which people need... surgery.",
				"buttons": [
					{
						text: "[back]",
						value: ["chat_city"]
					}
				]
			},
			{
				"scene_tag": "chat_self_family_2",
				text: "Whoever sired me did not wish to raise me. Perhaps I was better off without knowing such pitiful creatures.",
				"buttons": [
					{
						text: "[back]",
						value: ["chat_self"]
					}
				]
			}
		];
        
        // await this.showTextFromMinecraftDialog(player, scenes);
		await this.speak(player, "Heya, cap! You think they'll have any more of those Star Wars movies on the next world we stop at?");
    }
} 