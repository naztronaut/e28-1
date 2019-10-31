<!--
    @name       Singlechip
    @summary    Handling and displaying the single chips on the board
    @project    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
    <div
        class="chip"
        @click="$emit('swap-chip', chip.id)"
        :class="[{ empty: chip.empty },{ positioned: chip.position == chip.id }]"
        :style="chipStyle">
        <div class="chip_ind" v-if="!chip.empty"></div>
        <div class="chip_image-wrapper">
            <div v-if="!chip.empty" class="chip_image"
                :style="imgStyle(chip.id)">
            </div>
        </div>
    </div>
</template>

<script>
 export default {
    name: 'SingleChip',
    props: {
        chip        : Object,
        chipSize    : Number,
        level       : Number,
        img         : null,
    },
    data: () => ({

    }),
    computed: {
        chipStyle() { return {
            width   : this.chipSize + 'px',
            height  : this.chipSize + 'px',
            left    : this.left + 'px',
            top     : this.top + 'px'
        }},
        gridSize()  { return this.level*this.chipSize},
        correct()   { return this.chip.position == this.number },
        left()      { return this.chip.position%this.level * this.chipSize }, // Position X
        top()       { return Math.floor(this.chip.position/this.level) * this.chipSize } // Position Y
    },
    methods: {
        imgStyle(id) {
            let cLeft   = id%this.level*this.chipSize
            let cTop    = Math.floor(id/this.level)*this.chipSize

            return {
                width             : this.gridSize+'px',
                height            : this.gridSize+'px',
                left              : -cLeft+'px',
                top               : -cTop+'px',
                backgroundImage   : `url(${this.img})`
            }
        }
    }
}
</script>