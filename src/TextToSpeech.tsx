import React from 'react'
import logo from "./logo.svg";

type CounterProps = {};

type CounterState = {
    stateOfWorkout: string;
    counterBetweenReps: number;
};

class TextToSpeech extends React.Component<CounterProps, CounterState> {

    private STATE_STARTED: string = "STARTED"
    private STATE_STOPPED: string = "STOPPED"
    private exerciseNames: string[]
    private secondsBetweenReps: number = 3
    private timeoutBetweenReps: number = 6
    private intervalId: number
    private useAudio: boolean

    state: CounterState = {
        stateOfWorkout: this.STATE_STOPPED,
        counterBetweenReps: this.secondsBetweenReps + this.timeoutBetweenReps
    }

    constructor(props: CounterProps) {
        super(props)
        this.exerciseNames = ["Shoot", "Drive", "Pass",]
        this.intervalId = -1
        this.useAudio = true
        this.resetCounterForNewRepetition()
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

    resetCounterForNewRepetition = () => {
        this.setState({counterBetweenReps: this.secondsBetweenReps + this.timeoutBetweenReps})
    }

    decrementCounterBetweenReps = () => {
        const currentCounter = this.state.counterBetweenReps - 1
        this.setState({counterBetweenReps: currentCounter})
    }

    startWorkout = () => {
        this.speakText("Starting Workout")
        this.setState({stateOfWorkout: this.STATE_STARTED})
        this.intervalId = window.setInterval(() => {
            // @ts-ignore
            console.log(`stateOfWorkout: ${this.state.stateOfWorkout}`)
            if (this.state.counterBetweenReps === 0) {
                this.sayRandomExerciseName()
                this.resetCounterForNewRepetition()
            } else {
                console.log(`this.counterBetweenReps: ${this.state.counterBetweenReps}; this.secondsBetweenReps: ${this.secondsBetweenReps}`)
                if(this.state.counterBetweenReps <= this.secondsBetweenReps) {
                    this.speakText(this.state.counterBetweenReps.toString())
                }
                this.decrementCounterBetweenReps()
            }

            if (this.isWorkoutStopped()) {
                // The stop button has been hit
                console.log('Stopping Countdown')
                this.speakText("Stopped Workout")
                clearInterval(this.intervalId)
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
        const logoClassNames = this.isWorkoutRunning() ? "App-logo App-logo-animate" : "App-logo"

        return <React.Fragment>

            <img src={logo} className={logoClassNames} alt="logo"/>

            {this.isWorkoutRunning() ? <div><p>Next repetition in: {this.state.counterBetweenReps+1} seconds</p></div> : '' }

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
