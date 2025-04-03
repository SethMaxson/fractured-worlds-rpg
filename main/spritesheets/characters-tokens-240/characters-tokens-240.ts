import { Spritesheet, Presets } from '@rpgjs/client'

const { RMSpritesheet } = Presets

@Spritesheet({
    ...RMSpritesheet(1, 1),
    scale: [4/15],
    spriteRealSize: {
        width: 45,
        height: 52,
    },
})
export default class Characters2MinuteTabletop { }