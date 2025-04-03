import { RpgSprite, RpgSpriteHooks } from '@rpgjs/client'

const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        sprite.eventMode = "static";
        //@ts-ignore
        // console.log(`init: ${sprite.data.name}`, sprite);
        //@ts-ignore
        if (sprite.data && sprite.data.type == "event") {
            // sprite.onclick = () => {
            //     sprite.onAction();
            // }
            // sprite.on('pointerdown', () => { // or click
            //     console.log('clicked sprite');
            // });
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