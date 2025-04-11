import { RpgEvent, RpgPlayer, RpgShape } from '@rpgjs/server'
import { DialogOptions } from '@rpgjs/server/lib/Gui/DialogGui';
import { HitBox, HitType } from '@rpgjs/types';
import { EmotionBubble } from '@rpgjs/plugin-emotion-bubbles'
import Config from '../../config';
import { Utils } from '../../common/utils';

interface IMinecraftDialogObject {
    scene_tag: string;
    npc_name?: string;
    text: string;
    buttons?: { text: string, value?: string[]}[];
}


export default class NpcEvent extends RpgEvent {
    occupation?: string;
    _isMale: boolean = true;
    _isInsideInteractShape = false;

    onInit() {
        const map = this.getCurrentMap();

        if (!Config.debug || !map) {
            return;
        }
        
        if (Config.devSettings.showHitboxes) {
            // create a shape to highlight it
            const id = 'seq-debug-' + Math.round(Math.random() * 1000000).toString();
            const shape = this.getCurrentMap()?.createShape(
                {
                    x: this.hitbox.pos.x,
                    y: this.hitbox.pos.y,
                    width: this.hitbox.w,
                    height: this.hitbox.h,
                    name: id,
                    hitType: HitType.Box,
                    properties: {
                        color: '#ff0000'
                    }
                } as HitBox
            );
            this.attachShape(shape);
            // setTimeout(() => {
            //     map.removeShape(id);
            // }, 5000);
        }
    }

    //#region Properties
    get isFemale(): boolean { return !this._isMale; }
    set isFemale(value: boolean) { this._isMale = !value; }
    get isMale(): boolean { return this._isMale; }
    set isMale(value: boolean) { this._isMale = value; }
    //#endregion Properties

    //#region Event Handlers
    async onInShape(shape: RpgShape) {
        this.showEmotionBubble(EmotionBubble.Exclamation);
        

        if (Utils.isShapeObjectPlayerRadius(shape)) {
            this._isInsideInteractShape = true;
        }
    }

    async onOutShape(shape: RpgShape) {
        if (Utils.isShapeObjectPlayerRadius(shape)) {
            this._isInsideInteractShape = false;
        }
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
        await player.showText(
            this._formatDialogString(message, speaker),
            this._getDialogOptions(options)
        );
    }

    async showTextFromMinecraftDialog(player: RpgPlayer, scenes: IMinecraftDialogObject[], speaker?: string | null, options?: DialogOptions | undefined) {
        let choice = await this._showMinecraftDialogScene(player, scenes[0], speaker, options);

        while (choice && choice.value != "none") {
            let filtered = scenes.filter(s => s.scene_tag == choice?.value);
            if (filtered.length == 0) {
                console.log(`unable to find scene: ${choice.value}`);
                return;
            }
            choice = await this._showMinecraftDialogScene(player, filtered[0], speaker, options);
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
        
        return name + ': ';
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

    //#endregion Dialog Stuff
} 