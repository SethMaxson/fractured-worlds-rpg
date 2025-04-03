import { RpgClient, RpgModule, RpgSceneMap } from '@rpgjs/client';

@RpgModule<RpgClient>({
    // others options here and ...
    scenes: {
        map: {
            onAfterLoading(scene: RpgSceneMap) {
                if (!scene || !scene.viewport) {
                    return;
                }
                // scene.viewport?.resize(screen.width, screen.height, screen.width, screen.height);
                scene.viewport?.setZoom(2); // https://viewport.pixijs.io/jsdoc/Viewport.html#setZoom
                // scene.viewport?.setTransform();
            }
        }
    }
})
export default class RpgClientModuleEngine {}