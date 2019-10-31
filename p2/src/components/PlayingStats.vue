<!--
    @name       PlayingStats
    @summary    Showing the live stats of the game while being played
    @project    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
    <div class="stats" v-if="moves">
        <div class="moves">
            <span class="t_value">{{ moves }}</span>
            <span class="t_unit">move<span v-if="moves > 1">s</span></span>
        </div>
        <formatted-timer v-if="duration" :entry="duration"></formatted-timer>
    </div>
</template>

<script>
import FormattedTimer from './FormattedTimer'

export default {
    name: 'PlayingStats',
    components: { 'formatted-timer' : FormattedTimer },
    props: {
        duration    : { type: Number }, // In seconds
        moves       : { type: Number }  // Number of moves
    }
}
</script>