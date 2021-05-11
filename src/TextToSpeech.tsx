import React from 'react'

class TextToSpeech extends React.Component {
    private STATE_STARTED: string = "STARTED"
    private STATE_STOPPED: string = "STOPPED"
    private exerciseNames: string[]
    private countdown: number = 3
    private intervalId: number
    private useAudio: boolean

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.exerciseNames = ["Shoot", "Drive", "Pass",]
        this.intervalId = -1
        this.useAudio = false
        this.state = {stateOfWorkout: this.STATE_STOPPED}
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
        console.log(`Saying: ${text}`)
        if (this.useAudio) {
            speechSynthesis.speak(new SpeechSynthesisUtterance(text))
        }
    }

    resetForNewRepetition = () => {
        this.countdown = 3
    }

    startWorkout = () => {
        this.setState({stateOfWorkout: this.STATE_STARTED})
        this.intervalId = window.setInterval(() => {
            // @ts-ignore
            console.log(`stateOfWorkout: ${this.state.stateOfWorkout}`)
            if (this.countdown === 0) {
                this.sayRandomExerciseName()
                this.resetForNewRepetition()
                if (this.isWorkoutStopped()) {
                    // The stop button has been hit
                    console.log('Stopping Countdown')
                    clearInterval(this.intervalId)
                }
            } else {
                this.speakText(this.countdown.toString())
                this.countdown--
            }
        }, 1000)
    }



    stopWorkout = () => {
        this.setState({stateOfWorkout: this.STATE_STOPPED})
    }

    isWorkoutRunning = (): boolean => {
        // @ts-ignore
        return this.state.stateOfWorkout === this.STATE_STARTED
    }

    isWorkoutStopped = (): boolean => {
        // @ts-ignore
        return this.state.stateOfWorkout === this.STATE_STOPPED
    }

    render() {
        return <React.Fragment>
            <div>
                {this.isWorkoutStopped() ? <button onClick={this.startWorkout}>Start Workout</button> : ''}
            </div>
            <div>
                {this.isWorkoutRunning() ? <button onClick={this.stopWorkout}>STOP Workout</button> : '' }
            </div>
        </React.Fragment>
    }
}

export default TextToSpeech
