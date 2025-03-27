import { RpgClient, RpgModule, RpgSceneMap } from '@rpgjs/client';

@RpgModule<RpgClient>({
    // others options here and ...
    scenes: {
        map: {
            onAfterLoading(scene: RpgSceneMap) {
                // scene.viewport?.resize(screen.width, screen.height, screen.width, screen.height);
                scene.viewport?.setZoom(2); // https://viewport.pixijs.io/jsdoc/Viewport.html#setZoom
            }
        }
    }
})
export default class RpgClientModuleEngine {}