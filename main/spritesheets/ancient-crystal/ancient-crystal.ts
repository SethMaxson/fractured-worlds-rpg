import { Animation, Spritesheet } from '@rpgjs/client'

const AncientCrystalSpritesheetPreset = () => {
    const stand = (framesWidth: number, speed: number = 5) => {
        const array: any = [];
        for (let i = 0; i < framesWidth; i++) {
            array.push({ time: i * speed, frameX: i, frameY: 0 });
        }
        return array;
    }

    return {
        anchor: [0, 0.5],
        pivot: [0, 0.8],
        rectWidth: 64,
        rectHeight: 120,
        scale: [1/2],
        spriteRealSize: {
            width: 64,
            height: 64,
        },
        framesWidth: 7,
        framesHeight: 1,
        textures: {
            [Animation.Stand]: {
                offset: {
                    x: 0,
                    y: 0,
                },
                animations: () => [stand(7, 5)]
            }
        },
    }
}

@Spritesheet({
    ...AncientCrystalSpritesheetPreset(),
})
export default class AncientCrystal { }