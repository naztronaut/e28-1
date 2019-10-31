<!--
    @name       LevelPicker
    @summary    To select and define the gameplay level
    @project    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
    <div class="levels">
        <span>Difficaulty</span>
        <div v-for="l in levels"
            :key="l"
            :class="level == l ? 'level active' : 'level'"
            @click="$emit('set-level', l)">
            <span></span>{{ l }}
        </div>
    </div>
</template>
<script>
export default {
    name    : "levelpicker",
    props   : {
        level    : { type: Number },
        levels  : { type: Array },
    }
}
</script>