import { Animation, Spritesheet } from '@rpgjs/client'
import { Direction } from '@rpgjs/common'

const LPCSpritesheetPreset = () => {
    const frameY = (direction: Direction) => {
        return {
            [Direction.Down]: 2,
            [Direction.Left]: 1,
            [Direction.Right]: 3,
            [Direction.Up]: 0
        }[direction]
    }

    const stand = (direction: Direction) => [{ time: 0, frameX: 1, frameY: frameY(direction) }]
    const anim = (direction: Direction, framesWidth: number, speed: number = 5) => {
        const array: any = []
        for (let i = 0; i < framesWidth; i++) {
            array.push({ time: i * speed, frameX: i, frameY: frameY(direction) })
        }
        return array
    }

    return {
        rectWidth: 64,
        rectHeight: 64,
        spriteRealSize: {
            width: 48,
            height: 54,
        },
        framesWidth: 6,
        framesHeight: 4,
        textures: {
            [Animation.Stand]: {
                offset: {
                    x: 0,
                    y: 512,
                },
                animations: (direction: Direction) => [stand(direction)]
            },
            // [Animation.Stand]: {
            //     offset: {
            //         x: 0,
            //         y: 1408,
            //     },
            //     framesWidth: 2,
            //     framesHeight: 4,
            //     animations: (direction: Direction) => [anim(direction, 2, 75)]
            // },
            [Animation.Walk]: {
                offset: {
                    x: 0,
                    y: 512,
                },
                framesWidth: 9,
                framesHeight: 4,
                animations: (direction: Direction) => [anim(direction, 9)]
            },
            [Animation.Attack]: {
                offset: {
                    x: 0,
                    y: 768,
                },
                framesWidth: 6,
                framesHeight: 4,
                animations: (direction: Direction) => [anim(direction, 6, 3)]
            },
            [Animation.Skill]: {
                framesWidth: 7,
                framesHeight: 4,
                animations: (direction: Direction) => [anim(direction, 7, 3)]
            }
        },
    }
}

@Spritesheet({
    ...LPCSpritesheetPreset(),
})
export default class CharactersLPC { }