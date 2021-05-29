import React, {useState} from 'react'

import {
    DEFAULT_EXERCISES_ARR, INITIAL_SECONDS_BETWEEN_REPS,
    FINAL_NUMBERS_TO_SPEAK, URL_EXERCISES
} from "../AppDefaults";

import useTimer from "../hooks/useTimer";
import useLocalStorage, {LOCAL_STORAGE_KEY_DURATION, LOCAL_STORAGE_KEY_EXERCISES} from "../hooks/useLocalStorage";

import SectionNavbar from "../components/SectionNavbar";
import {Link} from 'react-router-dom';

import TextToSpeech from "../services/TextToSpeech";

import bball_img from "../images/bball_220x220.png"

function WorkoutPage() {
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
    const [useAudio] = useState(true)
    const [exercises,] = useLocalStorage(LOCAL_STORAGE_KEY_EXERCISES, DEFAULT_EXERCISES_ARR)

    const {secondsLeft, setSecondsLeft, isRunning, start, stop} = useTimer({
        duration: INITIAL_SECONDS_BETWEEN_REPS,
        onExpire: () => sayRandomExerciseName(),
        onTick: () => handleTick(),
    })

    const sayRandomExerciseName = () => {
        let index: number = getRandomInt(exercises.length)
        const exercise: Exercise = exercises[index]
        let exerciseName: string = exercise.name
        TextToSpeech.speakText(exerciseName, useAudio)
        setCurrentExercise(exercise)
        setSecondsLeft(exercise.rep_duration)
    }

    const handleTick = () => {
        const sec = secondsLeft - 1
        if (sec === 3 || sec === 2) {
            setCurrentExercise(null)
        }
        if (sec <= FINAL_NUMBERS_TO_SPEAK) {
            TextToSpeech.speakText(sec.toString(), useAudio)
        }
    }

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    const stopWorkout = (event: any) => {
        stop()
        setCurrentExercise(null)
    }

    const logoClassNames = isRunning ? "App-logo App-logo-animate" : "App-logo"

    const timerDisplay = secondsLeft;
    const exerciseNames: Array<string> = exercises.map((exercise: Exercise) => {
        return exercise.name
    })


    return <React.Fragment>
        <SectionNavbar/>
        <div>
            <h3>Exercises during Work Out:</h3> {exerciseNames.join(", ")}
            &nbsp;<Link to={URL_EXERCISES}>(edit)</Link>
        </div>
        <br/>
        <br/>

        {!isRunning ? <div>
            <button onClick={start}>Start Workout</button>
        </div> : ''}

        {isRunning ? <div>
            <button onClick={stopWorkout}>STOP Workout</button>
        </div> : ''}

        {isRunning ? <div><p>Next rep in: {timerDisplay} seconds</p></div> : ''}

        <div className="bballBackground" style={{backgroundColor: currentExercise?.color}}>
            <img src={bball_img} className={logoClassNames} alt="logo"/>
        </div>

        {currentExercise && isRunning ? <h1>{currentExercise.name}</h1> : ''}

    </React.Fragment>
}

export default WorkoutPage
