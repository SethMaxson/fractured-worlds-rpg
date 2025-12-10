import { RpgModule, RpgClient } from '@rpgjs/client'
import DialogUi from './window/dialog.vue'
import ChoiceUi from './window/choice.vue'
import BattleUi from './Battle/main.vue'
import MenuUi from './menu/main.vue'
import ShopUi from './shop/main.vue'
import WindowUi from './window/window.vue'
import DisconnectUi from './notifications/disconnected.vue'
import NotificationUi from './notifications/alert.vue'
import { GuiSounds } from './assets/sounds'

@RpgModule<RpgClient>({
    gui: [
        DialogUi,
        WindowUi,
        ChoiceUi,
        DisconnectUi,
        BattleUi,
        MenuUi,
        ShopUi,
        NotificationUi
    ],
    sounds: [
        GuiSounds
    ]
})
export default class RpgClientEngine {}