import { Control, RpgSceneMap, RpgSprite, RpgSpriteHooks } from '@rpgjs/client'

let _socket: any;

const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        sprite.eventMode = "static";
        // sprite.interactive = true;
        sprite.on('pointerdown', (position) => {
            _socket.emit('click')
        })
        //@ts-ignore
        // console.log(`init: ${sprite.data.name}`, sprite);
        //@ts-ignore
        if (sprite.data && sprite.data.type == "event") {
            sprite.onclick = () => {
                // sprite.onAction();
            }
            sprite.on('pointerdown', () => { // or click
                console.log('clicked sprite');
            });

            // this.rpgScene().getSprite(this.spriteData.id)
            // const scene = sprite.getScene() as RpgSceneMap;
            // scene?.controls.applyControl(Control.Action);
        }
        
        // // Functional, but not currently needed.
        // sprite.on('click', () => {
        //     sprite.guiDisplay = !sprite.guiDisplay;
        // })
    }
}

export default sprite;


// function isEvent(obj: any): obj is RpgEvent {
//     return obj.foo !== undefined 
// }