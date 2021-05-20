export default class TextToSpeech {
    static speakText = (text: string, useAudio: boolean) => {
        console.log(`Saying: ${text}; useAudio: ${useAudio}`)
        if (useAudio) {
            try {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.volume = 7;
                speechSynthesis.speak(utterance)
            } catch(e) {
                console.log('Caught error')
                console.error(e)
            }
        }
    }
