import React from 'react'

class TextToSpeech extends React.Component {
    private exerciseNames: string[]
    private countdown: number = 3
    private intervalId: number;

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.exerciseNames = ["Shoot", "Drive", "Pass",]
        this.intervalId = -1
    }

    getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    sayRandomExerciseName = () => {
        let index: number = this.getRandomInt(this.exerciseNames.length)
        let exerciseName: string = this.exerciseNames[index]
        this.speakText(exerciseName)
    }

    speakText = (text: string) => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }

    resetCountdown = () => {
        clearInterval(this.intervalId)
        this.countdown = 3
    }

    startWorkout = () => {
        this.intervalId = window.setInterval(() => {
            if (this.countdown === 0) {
                this.sayRandomExerciseName()
                console.log('Countdown is done')
                this.resetCountdown()
            } else {
                console.log('Countdown:', this.countdown)
                this.speakText(this.countdown.toString())
                this.countdown--
            }
        }, 1000)
    }

    render() {
        return <button onClick={this.startWorkout}>Start Workout</button>
    }
}

export default TextToSpeech
