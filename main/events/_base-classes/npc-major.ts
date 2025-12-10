import { Components, RpgEvent, RpgPlayer, RpgShape } from '@rpgjs/server'
import { EmotionBubble } from '@rpgjs/plugin-emotion-bubbles'
import Config from '../../config';
import NpcEvent from './npc';

export default class NpcMajorEvent extends NpcEvent {
    onInit() {
        super.onInit({ label: { show: true, textColor: '#8080ff' } });
    }
} 