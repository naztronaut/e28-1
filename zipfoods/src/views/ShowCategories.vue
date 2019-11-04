<template>
    <div>
        <h2>Categories</h2>
        <ul class='cleanList'>
            <li v-for='(category, id) in categories' :key='id'>{{ category }}</li>
        </ul>
    </div>
</template>

<script>
import { products } from './../products.js'

export default {
    name: '',
    data: () => ({ products }),
    computed: {
        categories() {
            return this.products.reduce((cat, p) => ([...new Set([].concat(...p.categories, ...cat))].sort()),[])
        }
    }
}
</script>