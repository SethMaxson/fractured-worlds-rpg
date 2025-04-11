import { Spritesheet, Presets } from '@rpgjs/client'

const { RMSpritesheet } = Presets

@Spritesheet({
    ...RMSpritesheet(1, 1),
    anchor: [0.2, 0.5],
    pivot: [0, 0.5],
    scale: [2/15],
    spriteRealSize: {
        width: 45,
        height: 52,
    },
})
export default class CharactersOwlbear { }