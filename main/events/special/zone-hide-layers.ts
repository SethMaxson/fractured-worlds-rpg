import { RpgEvent, EventData, RpgPlayer, RpgMap, Components, ShapePositioning, RpgShape } from '@rpgjs/server'
import TeleportDestinations from '../../lists/teleport-destinations';
import { HitBox, HitObject, HitType } from '@rpgjs/types';

export default class ZoneHideLayers extends RpgEvent {
    layersToHide: string[];
    hide: boolean;
    // layerStatus: { name: string, show: boolean }[];
    onInit() {

    }
    ingestShape(shape: RpgShape) {
        const hideLayers = shape.properties['hideLayers'] as string | undefined;

        if (hideLayers) {
            this.layersToHide = hideLayers.split(",");
            this.hide = false;
            // this.layerStatus = [];
            // this.layersToHide.forEach(layer => {

            // });
            this.attachShape(shape);
        }
    }
    onDetectInShape(player: RpgPlayer, shape: RpgShape) {
        this.setVariable("PLAYER_IN_SHAPE", true);
    }
    onDetectOutShape(player: RpgPlayer, shape: RpgShape) {
        this.setVariable("PLAYER_IN_SHAPE", false);
    }
} 