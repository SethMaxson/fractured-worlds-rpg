import { RpgClient, RpgModule, RpgSprite, RpgClientEngine, RpgSceneMap } from '@rpgjs/client'
import { isMobileDevice } from '../common/is-mobile-device'
import Config from '../config'

let _socket: any;

@RpgModule<RpgClient>({ 
    sprite: {
        onInit(sprite: RpgSprite) {
            sprite.interactive = true
            sprite.on('pointerdown', (position) => {
                _socket.emit('click')
            })
        }
    },
    engine: {
        onConnected(rpgEngine: RpgClientEngine, socket: any) {
            _socket = socket
        }
    }
})
export default class RpgClientModuleEngine {} 