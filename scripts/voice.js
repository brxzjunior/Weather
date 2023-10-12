if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition()
    const inputCity = document.getElementById('enter')

    recognition.continuous = false
    recognition.lang = 'pt-BR'

    recognition.onstart = function() {
        console.log('Speech recognition started.')
    }

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript
        const firstWord = result.replace(/[\s.]+/g, ' ').split(' ')[0]
        inputCity.value = firstWord

        // Simulation of pressing the "Enter" key when the word is recognized
        simulateEnterKeyPress()
    }

    recognition.onerror = function(event) {
        alert('Speech recognition error. Please try again.')
    }

    recognition.onend = function() {
        console.log('Speech recognition terminated.')
    }

    function startSpeechRecognition() {
        recognition.start()
    }

    // Function to simulate pressing the "Enter" key
    function simulateEnterKeyPress() {
        const enterKeyEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            charCode: 13,
        })

        inputCity.dispatchEvent(enterKeyEvent)
    }

    const speakBtn = document.getElementById('speakBtn')
    speakBtn.addEventListener('click', startSpeechRecognition)
} else {
    alert('Your browser does not support the speech recognition API.')
}
