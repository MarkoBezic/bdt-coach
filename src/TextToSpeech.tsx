import React from 'react'
import bball_img from "./images/bball_220x220.png"

type CounterProps = {};

type CounterState = {
    secondsBetweenRepsSetting: number;
    stateOfWorkout: string;
    currentTimer: number;
    currentExercise: string | null;
};

class TextToSpeech extends React.Component<CounterProps, CounterState> {

    getItemFromLocalAsString = (localStorageKey: string) => {
        return localStorage.getItem(localStorageKey) || ''
    }

    setItemInLocal = (localStorageKey: string, value: string) => {
        localStorage.setItem(localStorageKey, value);
    }

    private exercises: string[]
    private readonly useAudio: boolean = true

    private STATE_STARTED: string = "STARTED"
    private STATE_STOPPED: string = "STOPPED"
    private DEFAULT_SECONDS_BETWEEN_REPS: number = 5

    private announceFinalNumbers: number = 3
    private intervalId: number

    state: CounterState = {
        stateOfWorkout: this.STATE_STOPPED,
        currentTimer: this.DEFAULT_SECONDS_BETWEEN_REPS,
        secondsBetweenRepsSetting: this.DEFAULT_SECONDS_BETWEEN_REPS,
        currentExercise: null,
    }

    constructor(props: CounterProps) {
        super(props)
        this.intervalId = -1
        this.exercises = ["Blitz", "Hard Show", "Soft Show",]
        this.resetCounterForNewRepetition()
    }

    componentDidMount() {
        const localstring = localStorage.getItem('bdt_secondsBetweenRepsAsString');
        if(localstring) {
            const secondsBetweenRepsAsInt =  parseInt(localstring)
            this.setState({secondsBetweenRepsSetting: secondsBetweenRepsAsInt})
        }
    }

    getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    sayRandomExerciseName = () => {
        let index: number = this.getRandomInt(this.exercises.length)
        let exerciseName: string = this.exercises[index]
        this.setState({currentExercise: exerciseName})
        this.speakText(exerciseName)
    }

    speakText = (text: string) => {
        console.log(`Saying: ${text}; useAudio: ${this.useAudio}`)
        if (this.useAudio) {
            speechSynthesis.speak(new SpeechSynthesisUtterance(text))
        }
    }

    resetCounterForNewRepetition = () => {
        this.setState({currentTimer: this.state.secondsBetweenRepsSetting})
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
        this.setState({stateOfWorkout: this.STATE_STOPPED, currentExercise: null}, () => {
            this.resetCounterForNewRepetition()
        })
    }

    isWorkoutRunning = (): boolean => {
        return this.state.stateOfWorkout === this.STATE_STARTED
    }

    isWorkoutStopped = (): boolean => {
        return this.state.stateOfWorkout === this.STATE_STOPPED
    }

    onTimeBetweenRepsChange = (event: any) => {
        const secondsBetweenRepsSettingString = event.target.value;

        const secondsBetweenRepsSettingInt = parseInt(secondsBetweenRepsSettingString);
        localStorage.setItem('bdt_secondsBetweenRepsAsString', secondsBetweenRepsSettingString);
        this.setState({secondsBetweenRepsSetting: secondsBetweenRepsSettingInt}, () => {
            this.resetCounterForNewRepetition()
        });

    }

    render() {
        const logoClassNames = this.isWorkoutRunning() ? "App-logo App-logo-animate" : "App-logo"

        const timerDisplay = this.state.currentTimer + 1;

        return <React.Fragment>
            <div>
                <label>Time Between Reps (sec.)</label>
                <input type="number"
                       name="secondsBetweenRepsSetting"
                       value={this.state.secondsBetweenRepsSetting}
                       onChange={this.onTimeBetweenRepsChange}/>
            </div>

            <img src={bball_img} className={logoClassNames} alt="logo"/>

            {this.state.currentExercise && this.isWorkoutRunning()?
                <h1>{this.state.currentExercise}</h1>
                : ''
            }

            {this.isWorkoutRunning() ?
                <div><p>Next repetition in: {timerDisplay} seconds</p></div> : ''}
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
