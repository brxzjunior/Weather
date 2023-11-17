let recognition

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition()
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition()
} else if ('mozSpeechRecognition' in window) {
    recognition = new mozSpeechRecognition()
} else {
    // Caso nenhuma API de reconhecimento de fala seja suportada
    showErrorVoice.style.display = 'block'
}

if (recognition) {
    const inputCity = document.getElementById('enter')
    const speakBtn = document.getElementById('speakBtn')

    recognition.continuous = false
    recognition.lang = 'pt-BR'

    recognition.onstart = function() {
        console.log('O reconhecimento de fala foi iniciado.')
        // Adiciona uma classe para indicar que o microfone está sendo usado
        speakBtn.classList.add('speaking')
    }

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript
        const firstWord = result.replace(/[\s.]+/g, ' ').split(' ')[0]
        inputCity.value = firstWord

        // Simulação de pressionar a tecla "Enter" quando a palavra é reconhecida
        simulateEnterKeyPress()
    }

    recognition.onerror = function(event) {
        alert('Erro no reconhecimento de fala! Tente novamente!')
        // Remove a classe em caso de erro
        speakBtn.classList.remove('speaking')
    }

    recognition.onend = function() {
        console.log('Reconhecimento de fala terminou.')
        // Remove a classe quando o reconhecimento de fala termina
        speakBtn.classList.remove('speaking')
    }

    function startSpeechRecognition() {
        recognition.start()
    }

    // Função para simular pressionar a tecla "Enter"
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

    speakBtn.addEventListener('click', startSpeechRecognition)
}
