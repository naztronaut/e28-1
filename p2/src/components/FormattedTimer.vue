<!--
    @name       FormattedTimer
    @summary    To get the time by seconds and print a formatted time by seconds, munites and hours
    @project    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
    <div class="timer_wrapper">
        <div class="timer" v-for='(part, i) in timer' :key="i">
            <div class="timer_parts" v-if="part.value !== false">
                <div class="t_value">{{ part.value }}</div>
                <div class="t_unit">{{ part.unit }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FormattedTimer',
    props: {
        entry : { type: Number } // In seconds
    },
    computed: {
        timer() {
            let u = 60
            let t = this.entry
            let m = t/u >= 1 ? Math.floor(t/u) : false //Minutes
            let h = m/u >= 1 ? Math.floor(m/u) : false // Hours
            return [
                { unit: 'Hrs', value: h },
                { unit: 'Min',  value: m >= u ? m%u : m },
                { unit: 'Sec',  value: t >= u ? t%u : t }
            ]
        }
    }
}
</script>