import { RpgEvent, RpgPlayer, RpgShape } from '@rpgjs/server'
import { DialogOptions } from '@rpgjs/server/lib/Gui/DialogGui';
import { HitBox, HitType } from '@rpgjs/types';
import { EmotionBubble } from '@rpgjs/plugin-emotion-bubbles'
import Config from '../../config';
import { Utils } from '../../common/utils';

export default class BaseCreatureEvent extends RpgEvent {
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
} 