import { Components, RpgEvent, RpgPlayer, RpgShape } from '@rpgjs/server'
import { EmotionBubble } from '@rpgjs/plugin-emotion-bubbles'
import Config from '../../config';
import NpcEvent from './npc';

export default class CrewmateEvent extends NpcEvent {
    onInit() {
        super.onInit();
		this.setComponentsTop(
            Components.text('{name}', { fill: '#80ff80', fontSize: Config.font.default.size, fontFamily: Config.font.default.family } ),
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

    // async onInShape(shape: RpgShape) {
    //     this.showEmotionBubble(EmotionBubble.Exclamation);
    // }
} 