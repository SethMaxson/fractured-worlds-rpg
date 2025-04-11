<template>
    <window :position="position" :fullWidth="fullWidth" class="dialog" @click="tryClose">
        <p class="speaker" v-if="speaker">{{ speaker }}</p>
        <p>{{ msg }}</p>
        <choices :choices="choices" @selected="close" v-if="isChoice" />
        <Arrow direction="down" :center="true" v-else-if="!autoClose" />
    </window>
</template>

<script lang="ts">
import Window from './window.vue'
import Choices from './choice.vue'
import Arrow from './arrow.vue'
import { Control } from '@rpgjs/client'

export default {
    name: 'rpg-dialog',
    inject: ['rpgEngine', 'rpgKeypress', 'rpgGuiClose', 'rpgGui'],
    props: ['speaker', 'message', 'choices', 'position', 'fullWidth', 'autoClose', 'typewriterEffect'],
    data() {
        return {
            typing: false,
            msg: ''
        }
    },
    async mounted() {
        let interval;
        this.rpgEngine.controls.stopInputs()
        if (!this.isChoice && !this.autoClose) {
            this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
                if (control && control.actionName == Control.Action) {
                    this.close();
                }
            })
        }
        let index = 0
        const typewriter = () => {
            if (!this.typing) {
                // The typing effect was skipped
                clearInterval(interval);
            }
            else if (index >= this.message.length) {
                this.typing = false;
                clearInterval(interval);
            } else {
                this.msg = this.msg + this.message[index];
                index++;
            }
        }
        if (!this.typewriterEffect) {
            this.msg = this.message;
        }
        else {
            this.typing = true;
            interval = setInterval(typewriter, 10);
        }
    },
    computed: {
        isChoice() {
            return this.choices && this.choices.length > 0;
        }
    },
    methods: {
        close(indexSelect) {
            // If the message hasn't been displayed yet, interperet the keypress as a command to show it all.
            if (this.typing) {
                this.msg = this.message;
                this.typing = false;
                return;
            }

            this.rpgGuiClose('rpg-dialog', indexSelect);
            this.rpgEngine.controls.listenInputs();
        },
        tryClose() {
            if (!this.isChoice) {
                this.close();
            }
        }
    },
    unmounted() {
        if (this.obsKeyPress) this.obsKeyPress.unsubscribe();
    },
    components: {
        Window,
        Choices,
        Arrow
    }
}
</script>

<style scoped>
.dialog {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    min-width: 300px;
    z-index: 1001;
}

.speaker {
    position: absolute;
    left: 0;
    bottom: 100%;
    /* border: $window-border;
    border-radius: $window-border-radius; */
    /* right: 0;
    top: 0; */
}
</style>