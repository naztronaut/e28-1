/**
 *
 * @summary E28 2019 - Week 2
 * @author Ali Pordeli
 *
 */
(() => {
    "use strict";

    let data = { // All data
        words: {
            'Aquiver'           : 'Quivering, trembling.',
            'Mellifluous'       : 'A sound that is sweet and smooth, pleasing to hear.',
            'Ineffable'         : 'Too great to be expressed in words.',
            'Hiraeth'           : 'A homesickness for a home you can\'t return to, or that never was.',
            'Nefarious'         : 'Wicked, villainous, despicable.',
            'Somnambulist'      : 'A person who sleepwalks.',
            'Sonorous'          : 'An imposingly deep and full sound.',
            'Serendipity'       : 'The chance occurrence of events in a beneficial way.',
            'Limerence'         : 'The state of being infatuated with another person.',
        },
        entryLimit : 8,
    }

    // Selectors
    let hangers           = document.getElementById('hangers'),
        entry             = document.getElementById('entry'),
        wordsContainer    = document.getElementById('words'),
        hint              = document.querySelector('#hint span'),
        body              = document.querySelector('body'),
        deadWords         = document.getElementById('dead_words'),
        reset             = document.getElementById('reset')

    // Start/restart the game
    let start = () => {
        deadWords.innerHTML         = ''
        hangers.innerHTML           = ''
        wordsContainer.innerHTML    = ''
        data.fails                  = []
        data.word                   = Object.keys(data.words)[Math.floor(Math.random() * Object.keys(data.words).length)]
        hint.innerHTML              = data.words[data.word]
        data.remained               = data.word.length
        body.classList.remove('fail')
        body.classList.remove('success')
        entry.focus()

        for (let i = 0; i < data.word.length; i++) {
            let el            = document.createElement('div')
            el.dataset.chr    = data.word.charAt(i).toLocaleLowerCase()
            wordsContainer.append(el)
        }
    }
    // Creating the hanger
    let addHanger = () => {
        let el = document.createElement('div')
        el.classList.add('hanger')
        hangers.append(el)
    }

    // Check the value
    let checkWord = word => {
        word = word.toLocaleLowerCase()
        let matches = [...document.querySelectorAll(`[data-chr="${word}"]`)]
        if (!matches.length && data.fails.indexOf(word.toLowerCase()) < 0) {
            addHanger()
            let el = document.createElement('div')
            el.innerHTML = word
            data.fails.push(word)
            deadWords.append(el)
            if (data.fails.length >= data.entryLimit) entryFail()
            return
        }
        matches.map(e => {
            data.remained--
            e.innerHTML = word
        })
        if (data.remained <= 0) body.classList.add('success')
    }

    // Entry failed for mor ethan limit attempts
    let entryFail = () => {
        [...document.querySelectorAll('#words div')].map(e => e.innerHTML = e.getAttribute('data-chr'))
        body.classList.add('fail')
    }

    // Eventlisteners
    entry.addEventListener('input', e => {
        checkWord(e.target.value)
        setTimeout(() => { e.target.value = '' }, 400)
    })
    reset.addEventListener('click', e => start()) // Reset button
    start()
})()