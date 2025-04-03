import { RpgGui, type RpgSceneMapHooks } from '@rpgjs/client'

const sceneMap: RpgSceneMapHooks = {
    onAfterLoading() {
        RpgGui.display('npc-tooltip');
    }
}

export default sceneMap;