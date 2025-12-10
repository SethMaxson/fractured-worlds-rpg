<template>
  <div class="equipment-menu">
        <rpg-window :fullWidth="true" height="80%">
           
        </rpg-window>
   </div>
</template>

<script>
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
}
</script>

<style>

</style>