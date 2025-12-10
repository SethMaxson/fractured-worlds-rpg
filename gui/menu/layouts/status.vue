<template>
    <div class="status-menu">
        <rpg-window :fullWidth="true" height="80%">
            <Bar :nb="6500" :max="9999" name="MaxHP" />
        </rpg-window>
   </div>
</template>

<script>
import Bar from '../../components/bar.vue';
import { Control } from '@rpgjs/client';

export default {
    inject: ['rpgCurrentPlayer', 'rpgKeypress', 'rpgSocket'],
    mounted() {
         this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
           
        })
        this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return
            if (control.actionName == Control.Back) {
                this.$emit('changeLayout', 'MainLayout')
            }
        })
    },
    unmounted() {
        this.obsKeyPress.unsubscribe()
        this.obsCurrentPlayer.unsubscribe()
    },
    components: {
        Bar
    }
}
</script>