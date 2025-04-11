import { RpgGui, PrebuiltGui, RpgSceneMap, type RpgSceneMapHooks } from '@rpgjs/client'
import { isMobileDevice } from './common/is-mobile-device';
import Config from './config';

const sceneMap: RpgSceneMapHooks = {
    onAfterLoading(scene: RpgSceneMap) {
        RpgGui.display('npc-tooltip');

        if (!isMobileDevice()) {
            RpgGui.hide(PrebuiltGui.Controls);
        }
        // scene.on('click', () => {
        //     //@ts-ignore
        //     scene.controls.applyControl(Control.Action)
        // });

        
        if (!scene || !scene.viewport) {
            return;
        }

        if (!isMobileDevice()) {
            // Adjust for desktop view
            // // scene.viewport?.resize(screen.width, screen.height, screen.width, screen.height);
            scene.viewport?.setZoom(Config.display.devicesSpecific.desktop.zoomFactor); // https://viewport.pixijs.io/jsdoc/Viewport.html#setZoom
        }
        else {
            // Adjust for mobile view
            scene.viewport?.setZoom(Config.display.devicesSpecific.mobile.zoomFactor);
        }
    }
}

export default sceneMap;