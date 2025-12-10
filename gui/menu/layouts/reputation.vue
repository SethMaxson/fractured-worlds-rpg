<template>
    <div class="reputation-menu">
        <rpg-window :fullWidth="true" height="90%" position="top" style="max-height: 100vh;">
            <div class="row">
                <rpg-choice
                    :choices="menu"
                    :column="3"
                    @selected="changeMenu"
                    align="center"
                    :active="menuActive"
                    class="top-header"
                    />
            </div>
            <div class="improve-legibility" v-if="mode != ''">
                <hr>
                <p class="space-between">
                    <span>
                        <span>Average Rating: </span>
                        <!-- <span v-if="listReviews.length > 0">{{ stars(scoreAverage) }} ({{ scoreAverage }})</span> -->
                        <span v-if="listReviews.length > 0"><span v-for="icon in starIconClasses(scoreAverage)">
                            <span class="icon" :class="icon"></span>
                        </span> ({{ scoreAverage }})</span>
                        <span v-else>N/A</span>
                    </span>
                    <span v-if="mode == 'all'">
                        Displaying all reviews
                    </span>
                    <span v-else>
                        Displaying reviews for
                        <span style="text-transform: capitalize;">
                            {{ mode }}
                        </span>
                    </span>
                </p>
            </div>
            <hr>
            <div class="review-content improve-legibility" v-if="mode != ''">
                <div v-if="listReviews.length > 0">
                    <rpg-choice :choices="listReviews" :column="1" @change="selected" @selected="choiceItem" ref="list">
                        <template v-slot:default="{ choice }">
                            <p class="item" :class="{ 'negative-review': choice.score < 2.5, 'glowing-review': choice.score > 4 }">
                                <p>
                                    <span style="padding-right: 1rem;">{{ stars(choice.score) }}</span> 
                                    <span>{{ choice.reviewer }}</span> 
                                </p>
                                <div v-if="choice.text" style="padding-left: 2rem;">
                                    <!-- <p>{{ choice.text }}</p> -->
                                    <p v-html="cleanText(choice.text)"></p>
                                </div>
                            </p>
                        </template>
                    </rpg-choice>
                </div>
                <div v-else>
                    <p>There don't seem to be any reviews for this adventurer yet.</p>
                </div>
            </div>
            
        </rpg-window>
    </div>
</template>

<script lang="ts">
import { Control } from '@rpgjs/client';

/** Data structure for a review of a player character or the party as a whole. */
interface ICharacterReview {
    reviewer: string;
    /** Who is this review about? */
    subject?: string;
    /** The date the review was written. */
    date?: string;
    /** The body of the review. */
    text: string;
    /** Score on a scale of 1-5. */
    score: number;
}

export default {
    inject: ['rpgCurrentPlayer', 'rpgKeypress', 'rpgSocket'],
    data() {
        return {
            player: {},
            menuActive: true,
            menu: [
                {
                    text: "All",
                    value: "all"
                },
                {
                    text: "Party",
                    value: "party"
                },
                {
                    text: "C.O.B.B.",
                    value: "cobb"
                },
                {
                    text: "Li'l Phil",
                    value: "phil"
                },
                {
                    text: "Pontiki",
                    value: "pontiki"
                },
                {
                    text: "Tero",
                    value: "tero"
                },
                {
                    text: "Tropey",
                    value: "tropey"
                }
            ],
            reviews: {
                party: [
                    {
                        reviewer: "Cade B.",
                        score: 5,
                        text: "Exceptional! Clearly destined for greatness! Would rate 6 stars if possible."
                    },
                    {
                        reviewer: "Boxboy",
                        score: 0.5,
                        text: "Killed my coworker in gladiatorial combat. This would have been fine since the fight was mutually agreed upon, except HE WAS A CHILD."
                    },
                    {
                        reviewer: "Kaptin Ootah",
                        score: 4,
                        text: "My feersum minyuns. Give us yor candy OR ESLE."
                    },
                    {
                        reviewer: "Boo",
                        score: 3,
                        text: "Adequate."
                    },
                    {
                        reviewer: "Alice",
                        score: 5,
                        text: "Thank you ever so much for saving me! I very much like my head right where it is!"
                    }
                ] as ICharacterReview[],
                cobb: [
                    {
                        reviewer: "Cade B.",
                        score: 5,
                        text: "As brave a man as any I've met. Why if I didn't know any better, I'd say he were physically incapable of feeling fear! L.O.L. (laughing out loud)!"
                    },
                    {
                        reviewer: "Boxboy",
                        score: 0.5,
                        text: "Tried to kidnap my coworker."
                    }
                ] as ICharacterReview[],
                phil: [
                    {
                        reviewer: "Nortle T.",
                        score: 5,
                        text: "Little Phil,\n\nThe music thingy is perfect! People have been saying that I don't hear anything else when I wear it, but I think they should just learn to talk louder! Ha ha ha ha!\n\n- Nortle\n\n P.S.: Ella says I need to stop typing 'ha's and start using something called an eh-moh-jee, but I don't know how to do that."
                    },
                    {
                        reviewer: "Spirit of Somewhere",
                        score: 3.5,
                        text: "A bit annoying, really. Trespassed and insisted I let him use the space for a solstice stage play, yet still found a way to label me a bad guy after I acquiesced. The play was pretty good though."
                    },
                    {
                        reviewer: "Portia F.",
                        score: 0.5,
                        text: "WON'T. STOP. SH*TTING IN MY OFFICE."
                    },
                    {
                        reviewer: "Caydence B.",
                        score: 5,
                        text: "Great dancer. Would dance-off again, though I'd prefer the next dance battle not be life-or-death."
                    }
                ] as ICharacterReview[],
                pontiki: [
                    
                ] as ICharacterReview[],
                tero: [
                    {
                        reviewer: "Cade B.",
                        score: 5,
                        text: "Enviable control over fire—one of the holiest of magics—and quick to risk life and limb for innocents. I'll eat my helmet if her deeds are not retold as fairy tales someday."
                    }
                ] as ICharacterReview[],
                tropey: [
                    {
                        reviewer: "Cade B.",
                        score: 5,
                        text: "Quick to provide a snack for his allies or a wallop for the wicked. Seems a sensible fellow."
                    }
                ] as ICharacterReview[],
            },
            currentItem: {},
            mode: "",
            step: 0,
            indexSelected: 0,
            doAction: false
        }
    },
    mounted() {
         this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
           
        })
        this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return
            if (control.actionName == Control.Back) {
                if (!this.mode) {
                    this.$emit('changeLayout', 'MainLayout');
                }
                // else if (this.step == 1) {
                //    this.step == 0;
                // }
                else {
                    this.mode = '';
                    this.description = '';
                    this.menuActive = true;
                }
            }
        })
    },
    unmounted() {
        this.obsKeyPress.unsubscribe();
        this.obsCurrentPlayer.unsubscribe();
    },
    computed: {
        listReviews() {
            let selectedReviews: ICharacterReview[] = [];
            if (this.mode == "all" || this.mode == "") {
                selectedReviews = selectedReviews.concat(this.reviews.party);
                selectedReviews = selectedReviews.concat(this.reviews.cobb);
                selectedReviews = selectedReviews.concat(this.reviews.phil);
                selectedReviews = selectedReviews.concat(this.reviews.pontiki);
                selectedReviews = selectedReviews.concat(this.reviews.tero);
            }
            else {
                selectedReviews = this.reviews[this.mode];
            }

            // return selectedReviews;
            return selectedReviews.sort(function(a, b) {
                const compA = a.date || "";
                const compB = b.date || "";
                return compA == compB ? 0
                    : compA > compB ? -1 : 1;
                // return (a.date || "") < (b.date || "");
            });
        },
        scoreAverage() {
            const list = this.listReviews;
            return this.listReviews.length > 0 ? Math.round((list.reduce((n, {score}) => n + score, 0) / list.length) * 4) / 4 : 0;
        }
    },
    methods: {
        cleanText(text: string): string {
            return text.replace(/\n/ig, "<br/>");
        },
        selected(index) {
            if (!this.listReviews[index]) {
                this.currentItem = {};
                this.indexSelected = 0;
                // if (this.listReviews.length == 0) this.mode = '';
                return;
            }
            this.currentItem = this.listReviews[index];
            this.indexSelected = index;
        },
        changeMenu(index) {
            const mode = this.menu[index].value;
            if (mode == 'cancel') {
                this.close();
                return;
            }
            this.menuActive = false;
            this.mode = mode;
            this.selected(0);
        },
        choiceItem(index) {
            this.currentItem = this.listReviews[index];
            this.indexSelected = index;
            this.step = 1;
        },
        stars(score: number): string {
            const boundedScore = Math.min(5, Math.max(0, score));
            // // round to nearest .5
            // const s = Math.round(boundedScore * 2) / 2;
            const s = Math.round(boundedScore);
            let string = "";

            for (let i = 0; i < s; i++) {
                string = string + "★";
            }
            for (let i = s; i < 5; i++) {
                string = string + "☆";
            }

            return string;
        },
        starIconClasses(score: number): string[] {
            const boundedScore = Math.min(5, Math.max(0, score));
            const s = Math.round(boundedScore * 2);
            const classes: string[] = [];
            let endMod = 0;

            for (let i = 0; i < Math.round(boundedScore-0.01); i++) {
                classes.push("full");
            }
            if (s % 2 == 1) {
                classes.push("half");
                endMod = 1;
            }
            for (let i = Math.ceil(boundedScore); i < 5; i++) {
                classes.push("empty");
            }

            return classes;
        },
    }
}
</script>



<style lang="scss">
.window-content {
    max-height: 100%;
}

.reputation-menu .choice-container.top-header p { font-size: 1.5rem !important; }
</style>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

@keyframes cursor {
  0% { opacity: 0.4 }
  100% { opacity: 0.7 }
}

.reputation-menu {
    // display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.review-content {
    height: calc(100% - 190px);
    width: 100%;
    display: flex;
}

.improve-legibility,
.improve-legibility * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.2rem;
}

.review-content > div,
.choice-container {
    width: 100%;
}

.choice-container {
    font-size: 1rem;
}

.shop-info {
    border-left: 1px solid white;
}

.space-between {
    justify-content: space-between;
    display: flex;
}

hr {
    margin: 5px 0px;
}

.row {
    flex-direction: row;
    display: flex;
}

.row > * {
    flex-direction: column;
    flex-flow: row wrap;
}

.row > div:last-child {
    text-align: right;
    width: 100%;
    padding: 5px;
}

.icon {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    background-size: cover;
}

.icon.empty {
    background-image: url('../../assets/icons/star-empty.svg')
}

.icon.full {
    background-image: url('../../assets/icons/star-filled.svg')
}

.icon.half {
    background-image: url('../../assets/icons/star-half.svg')
}

.negative-review {
    // opacity: 0.5;
    background: rgba(255, 0, 0, 0.25);
}

// .glowing-review {
//     background: rgba(0, 255, 255, 0.1);
// }

.item {
    width: 100%;
    margin: 0;
    position: relative;
    padding: 5px;
    border: 1px solid white;
}

// .item-quantity {
//     display: flex;
//     align-items: center;
// }

// .item-quantity > div {
//     width: 100%;
//     padding: 0px 20px;
// }

.cursor {
    position: relative;
}

.cursor > * {
    z-index: 10;
    padding: 5px;
    position: relative;
}

.cursor:before {
    content: '';
    position: absolute;
    background: $cursor-background;
    width: 100%;
    height: 100%;
    left: 0px;
    border: $cursor-border;
    animation: cursor 0.6s infinite alternate ease-in-out;
    z-index: 0;
}
</style>