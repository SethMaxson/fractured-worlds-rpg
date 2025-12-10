import { Components, RpgEvent, RpgPlayer, RpgShape } from '@rpgjs/server'
import { DialogOptions } from '@rpgjs/server/lib/Gui/DialogGui';
import { HitBox, HitType } from '@rpgjs/types';
import { EmotionBubble } from '@rpgjs/plugin-emotion-bubbles'
import Config from '../../config';
import { Utils } from '../../common/utils';
import BaseCreatureEvent from './base-creature';

interface IMinecraftDialogObject {
    scene_tag: string;
    npc_name?: string;
    text: string;
    buttons?: { text: string, value?: string[]}[];
}

interface INpcEventInitConfig {
    label?: {
        show?: boolean;
        textColor?: string;
    }
}

export default class NpcEvent extends BaseCreatureEvent {
    occupation?: string;
    _isMale: boolean = true;
    _isInsideInteractShape = false;

    onInit(config?: INpcEventInitConfig) {
        super.onInit();

        if (config?.label?.show) {
            this.setComponentsTop(
                Components.text('{name}', { fill: config.label.textColor || '#80ff80', fontSize: Config.font.default.size, fontFamily: Config.font.default.family } ),
                {
                    // width: 64,
                    // height: 16,
                    // marginTop: 5,
                    marginLeft: 0,
                    marginRight: 0,
                    // marginBottom: 10
            }
            );
        }


        const map = this.getCurrentMap();
    }

    //#region Event Handlers
    async onInShape(shape: RpgShape) {
        if (Utils.isShapeObjectPlayerRadius(shape)) {
            this.showEmotionBubble(EmotionBubble.Exclamation);
        }
        await super.onInShape(shape);
        
    }

    async onOutShape(shape: RpgShape) {
        await super.onOutShape(shape);
    }
    //#endregion Event Handlers

    //#region Dialog Stuff

    /**
     * Say something to the specified player.
     * @param player Who is this NPC talking to?
     * @param message What is this NPC saying?
     * @param speaker Who is actually doing the speaking? '' for no name display.
     * @param options Configure the dialog GUI settings.
     */
    async speak(player: RpgPlayer, message: string, speaker?: string | null, options?: DialogOptions | undefined) {
        return await player.showText(
            this._formatDialogString(message, speaker),
            this._getDialogOptions(options)
        );
    }

    /**
     * Say something to the specified player.
     * @param player Who is this NPC talking to?
     * @param message What is this NPC saying?
     * @param speaker Who is actually doing the speaking? '' for no name display.
     * @param options Configure the dialog GUI settings.
     * @returns true if 'Yes', false if 'No'
     */
    async speakYesOrNo(player: RpgPlayer, message: string, speaker?: string | null): Promise<boolean> {
        const choice = await player.showChoices(
            this._formatDialogString(message, speaker),
            [
                {
                    text: "Yes",
                    value: "y",
                },
                {
                    text: "No",
                    value: "n",
                }
            ]
        );

        return choice && choice.value == "y" || false;
    }

    // //TODO: either finish or delete this copy pasta from @rpgjs/server/src/GuiManager.ts
    // doText(player: RpgPlayer, msg: string, options: DialogOptions = {}): Promise<any> {
    //     const gui = new DialogGui(<any>player)
    //     this._gui[gui.id] = gui
    //     return gui.openDialog(msg, options)
    // }

    async showTextFromMinecraftDialog(player: RpgPlayer, scenes: IMinecraftDialogObject[], speaker?: string | null, options?: DialogOptions | undefined) {
        let choice = await this._showMinecraftDialogScene(player, scenes[0], speaker, options);

        while (choice && choice.value != "none") {
            if (/shop|openShop|open_shop|openstore|open_store|store|openTrade|open_trade|trade/i.test(choice.value)) {
                await this.openTrade(player);
                choice = await this._showMinecraftDialogScene(player, scenes[0], speaker, options);
            }
            else {let filtered = scenes.filter(s => s.scene_tag == choice?.value);
                if (filtered.length == 0) {
                    console.log(`unable to find scene: ${choice.value}`);
                    return;
                }
                choice = await this._showMinecraftDialogScene(player, filtered[0], speaker, options);
            }
            
        }
    }

    /**
     * Formats the dialog string for display.
     * @param message What is being said?
     * @param speaker Who is actually doing the speaking? '' for no name display.
     */
    private _formatDialogString(message: string, speaker?: string | null): string {
        const speakerName = this._getSpeakerNameString(speaker);
        const msg = speakerName + message;

        return msg;
    }

    /**
     * Gets a formatted string to display the speaker's name.
     * @param speaker Who is actually doing the speaking? '' for no name display.
     */
    private _getSpeakerNameString(speaker?: string | null): string {
        if (speaker && speaker == '') {
            return '';
        }

        let name: string = speaker || '';
        if (!speaker) {
            name = this.name;
        }
        
        return name + '|:|';
    }

    private async _showMinecraftDialogScene(player: RpgPlayer, dialog: IMinecraftDialogObject, speaker?: string | null, options?: DialogOptions | undefined) {
        const possibleChoices = dialog.buttons? dialog.buttons.map(b => { return {text: b.text, value: b.value && b.value[0] || "none" } }) : [];

        const choice = await player.showChoices(
            this._formatDialogString(dialog.text, speaker),
            possibleChoices,
            this._getDialogOptions(options)
        );

        return choice;
    }

    private _getDialogOptions(options?: DialogOptions | undefined): DialogOptions {
        const dialogOptions: DialogOptions = options || {};
        dialogOptions.talkWith ||= this;
        dialogOptions.typewriterEffect = Config.dialog.typewriterEffect;

        return dialogOptions;
    }

    async openTrade(player: RpgPlayer) {
        return;
    }

    //#endregion Dialog Stuff
} 