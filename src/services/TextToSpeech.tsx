export default class TextToSpeech {
    static speakText = (text: string, useAudio: boolean) => {
        console.log(`Saying: ${text}; useAudio: ${useAudio}`)
        if (useAudio) {
            speechSynthesis.speak(new SpeechSynthesisUtterance(text))
        }
    }
}
