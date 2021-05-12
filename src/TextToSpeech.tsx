import React from 'react'
import bball_img from "./images/bball_220x220.png"

type CounterProps = {};

type CounterState = {
    stateOfWorkout: string;
    currentTimer: number;
};

class TextToSpeech extends React.Component<CounterProps, CounterState> {

    private exercises: string[]
    private secondsBetweenRepsSetting: number = 5
    private readonly useAudio: boolean = false

    private STATE_STARTED: string = "STARTED"
    private STATE_STOPPED: string = "STOPPED"
    private announceFinalNumbers: number = 3
    private intervalId: number

    state: CounterState = {
        stateOfWorkout: this.STATE_STOPPED,
        currentTimer: this.secondsBetweenRepsSetting
    }

    constructor(props: CounterProps) {
        super(props)
        this.intervalId = -1
        this.exercises = ["Blitz", "Hard Show", "Soft Show",]
        this.resetCounterForNewRepetition()
    }

    getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    sayRandomExerciseName = () => {
        let index: number = this.getRandomInt(this.exercises.length)
        let exerciseName: string = this.exercises[index]
        this.speakText(exerciseName)
    }

    speakText = (text: string) => {
        console.log(`Saying: ${text}; useAudio: ${this.useAudio}`)
        if (this.useAudio) {
            speechSynthesis.speak(new SpeechSynthesisUtterance(text))
        }
    }

    resetCounterForNewRepetition = () => {
        this.setState({currentTimer: this.secondsBetweenRepsSetting})
    }

    decrementTimer = () => {
        const leftOnTimer = this.state.currentTimer - 1
        this.setState({currentTimer: leftOnTimer})
    }

    startWorkout = () => {
        this.speakText("Starting Workout")
        this.setState({stateOfWorkout: this.STATE_STARTED})
        this.startTimer()
    }

    startTimer = () => {
        this.intervalId = window.setInterval(() => {
            if (this.isWorkoutStopped()) {
                // The stop button has been hit
                this.speakText("Stopped Workout")
                clearInterval(this.intervalId)
            } else {
                if (this.state.currentTimer === 0) {
                    this.sayRandomExerciseName()
                    this.resetCounterForNewRepetition()
                } else {
                    if (this.state.currentTimer <= this.announceFinalNumbers) {
                        this.speakText(this.state.currentTimer.toString())
                    }
                    this.decrementTimer()
                }
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

            {this.isWorkoutRunning() ?
                <div><p>Next repetition in: {this.state.currentTimer + 1} seconds</p></div> : ''}

            <div>
                {this.isWorkoutStopped() ? <button onClick={this.startWorkout}>Start Workout</button> : ''}
            </div>
            <div>
                {this.isWorkoutRunning() ? <button onClick={this.stopWorkout}>STOP Workout</button> : ''}
            </div>
        </React.Fragment>
    }
}

export default TextToSpeech
