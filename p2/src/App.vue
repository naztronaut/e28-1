<!--
    @summary    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
  <div id="app" v-cloak :class="[{ win, shuffling, started }]">
    <div class="gameplay">
        <playing-stats v-bind="{ moves, duration }"></playing-stats>
        <div class="chips">
            <div id="chips"
                :style="{
                    width: chipSize*level + 'px',
                    height: chipSize*level + 'px' }">
                <single-chip v-for="chip in chips" :key="chip.id"
                    v-bind="{ chip, chipSize, level, img }"
                    @swap-chip="swap($event)">
                </single-chip>
            </div>
            <transition name="down">
                <div v-if="started || win"
                    class="button"
                    @click="shuffle">Shuffle
                </div>
            </transition>
            <transition name="down">
                <div v-if="!started && !win && !shuffling"
                    class="button cheat"
                    @click="cheat = !cheat">
                        <span v-if="cheat">Continue playing</span>
                        <span v-else>Take a peek</span>
                </div>
            </transition>
            <transition name="down">
                <div v-if="cheat" class="chips_cheat" :style="{backgroundImage: `url(${img})`}"></div>
            </transition>
        </div>
        <div class="sidebar">
            <level-picker v-bind="{ level, levels, shuffling }"
                @set-level="setLevel($event)">
            </level-picker>
             <transition name="down">
                <div v-if="!started && !win" class="side_button reset" @click="setLevel()">Reset</div>
            </transition>
            <label>
                <input id="img" type="file" accept="image/x-png,image/gif,image/jpeg" @change="getImg">
                <div class="side_button">Add Image</div>
            </label>
        </div>
        <score-panel v-bind:score.sync="score"></score-panel>
        <alert-box v-bind:alert.sync="alert"></alert-box>
    </div>
    <div class="alip"><span>Sliding puzzle made with Vue.js — by Ali Pordeli</span><span>E-28 2019 — Project 2</span></div>
  </div>
</template>

<script>
// Components
import SingleChip       from './components/SingleChip'
import PlayingStats     from './components/PlayingStats'
import LevelPicker      from './components/LevelPicker'
import ScorePanel       from './components/ScorePanel'
import AlertBox         from './components/AlertBox'
// Assets
import defaultImg from "./assets/images/default.jpg"
require ('./assets/style/stylesheet.css')

export default {
    name: 'app',
    components: {
        'single-chip'       : SingleChip,
        'playing-stats'     : PlayingStats,
        'level-picker'      : LevelPicker,
        'score-panel'       : ScorePanel,
        'alert-box'         : AlertBox,
    },
    data: () => ({
            chipSize    : 88,           // Size of each chip in the grid (px)
            shuffleTime : 30,           // Number of times the chips shuffle
            levels      : [2,3,4],      // Available levels
            level       : 3,            // Default level
            chips       : [],
            emptyP      : null,
            lastPlayd   : 0,
            shuffling   : false,
            moves       : 0,
            duration    : 0,
            cheat       : false,
            alert       : null,
            started     : true,
            img         : defaultImg,
            score       : {win:0, record:null, moves:0},
            alerts      : {
                shuffle   : '<b>Shuffle</b> to get started.',
                img       : 'Upload failed :(',
                move      : 'Cannot be moved.',
                win       : 'Yay! you did it.'
            },
    }),
    computed: {
        possible() { // Chips that are possible to be moved
            return this.chips.filter (e => (
                this.xP(e.position) == this.xP(this.emptyP) ||
                this.yP(e.position) == this.yP(this.emptyP)) &&
                (
                    this.abs(this.yP(e.position) - this.yP(this.emptyP)) == 1 ||
                    this.abs(this.xP(e.position) - this.xP(this.emptyP)) == 1)
                )
                .map(e => e.id)
        },
        possibleRandom() { // A random chip that is also possible to be moved
            return this.possible
                .filter(e => e != this.lastPlayd)
                .map(n => [Math.random(), n])
                .sort((a, b) => a[0] - b[0])
                .map(n => n[1])[0]
        },
        win() {
            if (this.started) return false
            let won = true
            this.chips.map(e => { if(e.id != e.position) won = false })
            return won
        }
    },
    mounted() { this.setLevel() },// Setting up the game
    methods: {
        xP(pos)  { return pos%this.level },                // X position generator
        yP(pos)  { return Math.floor(pos/this.level) },    // Y position generator
        abs(val) { return Math.abs(val) },
        setLevel(l=false)  {
            if(this.shuffling) return
            this.cheat = false
            this.level = l && l != this.level ? l: this.level
            this.stopTimer()
            this.started    = true
            let nums        = Array.from({ length:Math.pow(this.level, 2) }, (c,i) => i)

            this.chips = nums.reduce((s,n,i) => ([...s, { // The new chips array from new randomized array
                    content   : n == nums.length-1 ? '' : n+1,
                    position  : nums[n],
                    empty     : nums.length-1 == n,
                    id        : i,
                    clickable : false
                }]
            ),[])
            this.emptyP = this.chips[nums.length-1].position // Defining the position of the empty chip
        },
        shuffle() {
            if(this.shuffling) return
            let len         = this.level == 2 ? 3 : this.level*this.shuffleTime
            this.shuffling  = true
            this.moves      = 0

            for (let i = 0; i < len; i++) {
                this.shuffling = true
                setTimeout(() => {
                    this.swap(this.possibleRandom, true)
                    if(i == len-1) this.shuffling = false
                    this.started = false
                }, 50 *i)
            }
        },
        swap(id, shuffle=false) {
            if((this.started || this.win) && !shuffle) {
                this.alert = this.alerts.shuffle
                return
            }
            if(!this.possible.includes(id)) {
                this.alert = this.alerts.move
                return
            }
            this.lastPlayd = id
            this.chips.map(e => {
                if(e.id == id) {
                    let thisPosition    = e.position
                    e.position          = this.emptyP
                    this.emptyP         = thisPosition
                }
                return e
            }).map(e => {
                e.clickable = this.possible.includes(e.id) ? true : false
                return e
            })
            this.chips[this.chips.length-1].position = this.emptyP
            if(!this.shuffling) this.moves++
            if(this.moves == 1) this.startTimer()
            this.alert = null
        },
        startTimer() {
            this.duration = 1
            if(this.interval) clearInterval(this.interval)
            this.interval = setInterval(() => { this.duration++ }, 1000)
        },
        stopTimer() {
            this.duration   = 0
            this.moves      = 0
            if(this.interval) clearInterval(this.interval)
        },
        getImg(e) {
            let img = e.target.files[0]
            let reader = new FileReader()
            reader.onloadend = () => {
                this.img = reader.result
                this.setLevel()
            }
            if (img) {
                reader.readAsDataURL(img)
            } else {
                this.alert = this.alerts.img
            }
        }
    },
    watch: {
        win(val) {
            if(!val) return
            this.alert = {
                content   : `<b>${this.alerts.win}</b><span>With ${this.moves} moves</span><span>In ${this.duration} seconds</span>`,
                type      : 'success'
            }
            this.score.record   = this.score.record && this.score.record < this.duration ? this.score.record : this.duration
            this.score.moves    = this.score.moves && this.score.moves < this.moves ? this.score.moves : this.moves
            this.score.win++
            this.stopTimer()
        }
    }
}
</script>