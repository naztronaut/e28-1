<!--
    @name       AlertBox
    @summary    Showing and handling alerts, such as errors and success messages.
    @project    E28 2019 - Project 2
    @author     Ali Pordeli
-->
<template>
    <transition name="alert">
        <div v-if   ="alert"
            :class  ="alert.type ? alert.type : 'error'" v-html="alert.content ? alert.content : alert"
            id      ="alert">
        </div>
    </transition>
</template>
<script>
export default {
    name: 'AlertBox',
    props: {
        alert: { type: null },
    },
    watch: {
        alert(val) {
            if (!val) return
            if (this.alertReset) clearTimeout(this.alertReset)
            this.alertReset = val.type == 'success' ? null : setTimeout(() => { this.$emit('update:alert', null)  }, 2000)
        }
    },
}
</script>