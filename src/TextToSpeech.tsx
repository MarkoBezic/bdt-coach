import React from 'react'
import bball_img from "./images/bball_220x220.png"

type CounterProps = {};

type CounterState = {
    stateOfWorkout: string;
    secondsBetweenReps: number;
};

class TextToSpeech extends React.Component<CounterProps, CounterState> {

    private exerciseNames: string[]

    private STATE_STARTED: string = "STARTED"
    private STATE_STOPPED: string = "STOPPED"
    private secondsBetweenReps: number = 5 - 1
    private announceFinalNumbers: number = 3
    private intervalId: number
    private readonly useAudio: boolean

    state: CounterState = {
        stateOfWorkout: this.STATE_STOPPED,
        secondsBetweenReps: this.secondsBetweenReps
    }

    constructor(props: CounterProps) {
        super(props)
        this.exerciseNames = ["Blitz", "Hard Show", "Soft Show",]
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
        this.setState({secondsBetweenReps: this.secondsBetweenReps})
    }

    decrementsecondsBetweenReps = () => {
        const currentCounter = this.state.secondsBetweenReps - 1
        this.setState({secondsBetweenReps: currentCounter})
    }

    startWorkout = () => {
        this.speakText("Starting Workout")
        this.setState({stateOfWorkout: this.STATE_STARTED})
        this.intervalId = window.setInterval(() => {
            console.log(`stateOfWorkout: ${this.state.stateOfWorkout}`)
            if (this.state.secondsBetweenReps === 0) {
                this.sayRandomExerciseName()
                this.resetCounterForNewRepetition()
            } else {
                console.log(`this.secondsBetweenReps: ${this.state.secondsBetweenReps}`)
                if(this.state.secondsBetweenReps <= this.announceFinalNumbers) {
                    this.speakText(this.state.secondsBetweenReps.toString())
                }
                this.decrementsecondsBetweenReps()
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
        return this.state.stateOfWorkout === this.STATE_STARTED
    }

    isWorkoutStopped = (): boolean => {
        return this.state.stateOfWorkout === this.STATE_STOPPED
    }

    render() {
        const logoClassNames = this.isWorkoutRunning() ? "App-logo App-logo-animate" : "App-logo"

        return <React.Fragment>

            <img src={bball_img} className={logoClassNames} alt="logo"/>

            {this.isWorkoutRunning() ? <div><p>Next repetition in: {this.state.secondsBetweenReps+1} seconds</p></div> : '' }

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
