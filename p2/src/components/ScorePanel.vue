<!--
    @name       ScoresPanel
    @summary    Displaying & printing the recorded scores to/from the localstorage
    @project    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
    <div v-if="score.win" class="scores">
        <div class="score wins"><span>{{ score.win }}</span> Wins</div>
        <div class="score moves">Moves record <span>{{ score.moves }}</span></div>
        <div class="score">Best time<formatted-timer :entry="score.record"></formatted-timer></div>
    </div>
    <div v-else class="scores empty">No recorded scores yet, keep playing!</div>
</template>

<script>
import FormattedTimer   from './FormattedTimer'

export default {
    name: "ScorePanel",
    components: { 'formatted-timer': FormattedTimer },
    props: { score : { type: Object } },
    mounted() {
        if (!localStorage.puzzlescore) return
        this.$emit('update:score', JSON.parse(localStorage.puzzlescore))  // Writing score to local storage
    },
    watch: {
        score: {
            handler(newScore) {
                localStorage.puzzlescore = JSON.stringify(newScore)
            },
            deep: true
        }
    }
}
</script>