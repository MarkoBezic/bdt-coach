import React, {useState} from 'react'
import bball_img from "./images/bball_220x220.png"
import useTimer from "./hooks/useTimer";

const STATE_STARTED: string = "STARTED"
const STATE_STOPPED: string = "STOPPED"
const DEFAULT_SECONDS_BETWEEN_REPS: number = 5

function WorkoutPage(props: any) {
    const [stateOfWorkout, setStateOfWorkout ] = useState(STATE_STOPPED)
    const [currentTimer, setCurrentTimer ] = useState(DEFAULT_SECONDS_BETWEEN_REPS)
    const [secondsBetweenRepsSetting, setSecondsBetweenRepsSetting ] = useState(DEFAULT_SECONDS_BETWEEN_REPS)
    const [currentExercise, setCurrentExercise ] = useState<null | string>(null)
    const [useAudio, setUseAudio ] = useState(true)
    const [announceFinalNumbers, setAnnounceFinalNumbers ] = useState(3)
    const [exercises, setExercises ] = useState(["Blitz", "Hard Show", "Soft Show",])

    const {secondsLeft, isRunning, start, stop} = useTimer({ duration: DEFAULT_SECONDS_BETWEEN_REPS, onExpire: () => console.warn('onExpire called')});

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    const sayRandomExerciseName = () => {
        let index: number = getRandomInt(exercises.length)
        let exerciseName: string = exercises[index]
        setCurrentExercise(exerciseName)
        speakText(exerciseName)
    }

    const speakText = (text: string) => {
        console.log(`Saying: ${text}; useAudio: ${useAudio}`)
        if (useAudio) {
            speechSynthesis.speak(new SpeechSynthesisUtterance(text))
        }
    }

    const resetCounterForNewRepetition = () => {
        setCurrentTimer(secondsBetweenRepsSetting)
    }

    const decrementTimer = () => {
        const leftOnTimer = currentTimer - 1
        setCurrentTimer(leftOnTimer)
    }

    const startWorkout = () => {
        speakText("Starting Workout")
        setStateOfWorkout(STATE_STARTED)
        startTimer()
    }

    const startTimer = () => {
        // intervalId = window.setInterval(() => {
            if (isWorkoutStopped()) {
                // The stop button has been hit
                speakText("Stopped Workout")
                // clearInterval(intervalId)
            } else {
                if (currentTimer === 0) {
                    sayRandomExerciseName()
                    resetCounterForNewRepetition()
                } else {
                    if (currentTimer <= announceFinalNumbers) {
                        speakText(currentTimer.toString())
                    }
                    decrementTimer()
                }
            }
        // }, 1000)
    }

    const stopWorkout = () => {
        setStateOfWorkout(STATE_STOPPED)
        setCurrentExercise(null)
        setCurrentTimer(secondsBetweenRepsSetting)
    }

    const isWorkoutRunning = (): boolean => {
        return stateOfWorkout === STATE_STARTED
    }

    const isWorkoutStopped = (): boolean => {
        return stateOfWorkout === STATE_STOPPED
    }

    const onTimeBetweenRepsChange = (event: any) => {
        const secondsBetweenRepsSettingString = event.target.value;

        const secondsBetweenRepsSettingInt = parseInt(secondsBetweenRepsSettingString);
        localStorage.setItem('bdt_secondsBetweenRepsAsString', secondsBetweenRepsSettingString);
        setSecondsBetweenRepsSetting(secondsBetweenRepsSettingInt)
        resetCounterForNewRepetition()
    }

    const logoClassNames = isWorkoutRunning() ? "App-logo App-logo-animate" : "App-logo"

    const timerDisplay = currentTimer + 1;

    return <React.Fragment>
        <div>
            <label>Time Between Reps (sec.)</label>
            <input type="number"
                   name="secondsBetweenRepsSetting"
                   value={secondsBetweenRepsSetting}
                   onChange={onTimeBetweenRepsChange}/>
        </div>

        <img src={bball_img} className={logoClassNames} alt="logo"/>

        {currentExercise && isWorkoutRunning()?
            <h1>{currentExercise}</h1>
            : ''
        }

        {isWorkoutRunning() ?
            <div><p>Next repetition in: {timerDisplay} seconds</p></div> : ''}
        <div>
            {isWorkoutStopped() ? <button onClick={startWorkout}>Start Workout</button> : ''}
        </div>
        <div>
            {isWorkoutRunning() ? <button onClick={stopWorkout}>STOP Workout</button> : ''}
        </div>
    </React.Fragment>
}

export default WorkoutPage
