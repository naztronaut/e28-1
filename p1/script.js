/**
 *
 * @summary E28 2019 - Project 1
 * @author Ali Pordeli
 *
 */

const g = new Vue({
    el: '#app',
    data: {
        words: [
            {word: 'aquiver',        hint: 'Quivering, trembling.'},
            {word: 'mellifluous',    hint: 'A sound that is sweet and smooth, pleasing to hear.'},
            {word: 'ineffable',      hint: 'Too great to be expressed in words.'},
            {word: 'hiraeth',        hint: 'A homesickness for a home you can\'t return to, or that never was.'},
            {word: 'nefarious',      hint: 'Wicked, villainous, despicable.'},
            {word: 'somnambulist',   hint: 'A person who sleepwalks.'},
            {word: 'sonorous',       hint: 'An imposingly deep and full sound.'},
            {word: 'serendipity',    hint: 'The chance occurrence of events in a beneficial way.'},
            {word: 'limerence',      hint: 'The state of being infatuated with another person.'},
            {word: 'epoch',          hint: 'a particular period of time in history or a person\'s life.'},
            {word: 'oblivion',       hint: 'The state of being unaware of what is happening around you.'}
        ],
        errors: {
            entrytype       : 'You can type only letters',
            repeatedentry   : 'You already tried'
        },
        entry       : [],
        entryimit   : 7,
        playing     : false,
        word        : null,
        error       : null,
        score       : { win: 0, lose: 0 }
    },
    computed: {
        matched() { return this.entry.filter(e => this.word.includes(e)) },
        failed()  { return this.entry.filter(e => !this.word.includes(e)) },
        hint()    { return this.words ? this.words.filter(e => e.word == this.word)[0].hint : null },
        lose()    { return this.failed.length > this.entryimit },
        win()     { return this.splitWord ? this.splitWord.reduce((sum, w) => w["show"] ? sum + 1 : sum, 0) == this.word.length : false },
        // Selected word -> an array of objects
        splitWord() {
            return this.word ? this.word.split('').reduce((obj, w) => ([...obj, {
                show: this.matched.includes(w),
                word: w,
                print: this.matched.includes(w) ? w : ''
            }]), []) : null
        },
        // Erro handling
        showError() {
            if (this.error) {
                if (this.errorReset) clearTimeout(this.errorReset)
                this.errorReset = setTimeout(() => {
                    this.error = null
                }, 2000)
                return true
            } else return false
        }
    },
    mounted() {
        // Getting the entry value
        document.addEventListener('keydown', e => {
            if (this.lose || this.win) return
            if (e.keyCode > 90 || e.keyCode < 65) { // Limit to letters
                this.error = this.errors.entrytype
                return
            }
            if(this.entry.includes(e.key.toLowerCase())) {
                this.error = `${this.errors.repeatedentry} <span>${e.key.toUpperCase()}</span>`
                return
            }
            this.entry = [...this.entry, e.key.toLowerCase()]
        })
        // Writing score to local storage
        if (localStorage.score) this.score = JSON.parse(localStorage.score)
    },
    created() {
        this.reset()
    },
    watch: {
        lose(val)  { if(val) this.score.lose++ },
        win(val)   { if(val) this.score.win++ },
        word()     { this.entry = [] },
        score: {
            handler(newScore) {
                localStorage.score = JSON.stringify(newScore)
            }, deep: true}
    },
    methods: {
        reset() { this.word = this.words[Math.floor(Math.random() * this.words.length)].word }
    }
})