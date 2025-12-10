import { RpgGui, PrebuiltGui, RpgSceneMap, type RpgSceneMapHooks, RpgComponent } from '@rpgjs/client'
import { isMobileDevice } from './common/is-mobile-device';
import Config from './config';
import { RpgPlayer } from '@rpgjs/server';

const sceneMap: RpgSceneMapHooks = {
    onAfterLoading(scene: RpgSceneMap) {
        RpgGui.display('npc-tooltip');

        if (!isMobileDevice() && !(Config.debug && Config.devSettings.displayMobileInputOnDesktop)) {
            RpgGui.hide(PrebuiltGui.Controls);
        }
        // scene.on('click', () => {
        //     //@ts-ignore
        //     scene.controls.applyControl(Control.Action)
        // });

        
        if (!scene || !scene.viewport) {
            return;
        }

        if (Config.debug && Config.devSettings.forceZoom) {
            scene.viewport?.setZoom(Config.devSettings.forcedZoomValue);
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

        // scene.valuesChange.subscribe((obj) => {
        //     console.log("obj:", obj.data, obj.partial);
        // });
    },
    onChanges(scene: RpgSceneMap, obj) {
        // console.log("scene:", scene);
        // console.log("obj:", obj.data, obj.partial);
        if (obj.partial.users) {
            const player = scene.getCurrentPlayer() as RpgComponent<RpgPlayer>;
            // console.log("obj.partial.users:", obj.partial.users);
            // console.log("player:", player);
            if (!player || !player.id) {
                return;
            }
            const playerChanges = obj.partial.users[player.id];

            if (!playerChanges) {
                return;
            }
            // console.log("playerChanges:", playerChanges);
            // console.log("scene:", scene);
            
            if (playerChanges.hideLayers) {
                playerChanges.hideLayers.forEach(name => {
                    toggleLayer(scene, name, false);
                });
            }
            if (playerChanges.showLayers) {
                playerChanges.showLayers.forEach(name => {
                    toggleLayer(scene, name, true);
                });
            }
            
        }
    },
    onDraw(scene, t) {
        
    },
}

function toggleLayer(scene: RpgSceneMap, layerName: string, visibility: boolean) {
    // scene.getLayerByName(layerName).visible = visibility;
    // scene.getLayerByName(layerName).renderable = visibility;
    // scene.data.layers.filter(layer => layer.name == layerName)[0].visible = visibility;
    // scene.tilemap.layers[layerName].visible = visibility;
    // // scene.updateScene();
    // // scene.tilemap.tilesLayer.children[layerName].visible = visibility;
    
}

export default sceneMap;