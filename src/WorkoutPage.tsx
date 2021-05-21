import React, {useState} from 'react'

import {
    DEFAULT_EXERCISES_ARR,
    DEFAULT_SECONDS_BETWEEN_REPS,
    FINAL_NUMBERS_TO_SPEAK
} from "./AppDefaults";

import useTimer from "./hooks/useTimer";
import useLocalStorage, {LOCAL_STORAGE_KEY_DURATION, LOCAL_STORAGE_KEY_EXERCISES} from "./hooks/useLocalStorage";

import SectionNavbar from "./components/SectionNavbar";
import {Link} from 'react-router-dom';

import TextToSpeech from "./services/TextToSpeech";

import bball_img from "./images/bball_220x220.png"

function WorkoutPage(props: any) {
    const [currentExercise, setCurrentExercise] = useState<null | string>(null)
    const [useAudio] = useState(true)
    const [exercises,] = useLocalStorage(LOCAL_STORAGE_KEY_EXERCISES, DEFAULT_EXERCISES_ARR)

    const [repDuration, setRepDuration] = useLocalStorage(LOCAL_STORAGE_KEY_DURATION, DEFAULT_SECONDS_BETWEEN_REPS)

    const {secondsLeft, setSecondsLeft, isRunning, start, stop} = useTimer({
        duration: repDuration,
        onExpire: () => sayRandomExerciseName(),
        onTick: () => handleTick(),
    })

    const sayRandomExerciseName = () => {
        let index: number = getRandomInt(exercises.length)
        const exercise: Exercise = exercises[index]
        let exerciseName: string = exercise.name
        setCurrentExercise(exerciseName)
        TextToSpeech.speakText(exerciseName, useAudio)
    }

    const handleTick = () => {
        const sec = secondsLeft - 1
        if (sec <= FINAL_NUMBERS_TO_SPEAK) {
            TextToSpeech.speakText(sec.toString(), useAudio)
        }
    }

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    const onTimeBetweenRepsChange = (event: any) => {
        const secondsBetweenRepsSettingString = event.target.value;
        const secondsBetweenRepsSettingInt = parseInt(secondsBetweenRepsSettingString)
        setRepDuration(secondsBetweenRepsSettingInt)
        setSecondsLeft(secondsBetweenRepsSettingInt)
    }

    const stopWorkout = (event: any) => {
        stop()
        setCurrentExercise(null)
    }

    const logoClassNames = isRunning ? "App-logo App-logo-animate" : "App-logo"

    const timerDisplay = secondsLeft;

    return <React.Fragment>
        <SectionNavbar/>
        <div>
            <h1>Basketball Decision Trainer</h1>
            <h2>Practice Your Decision Making When You're Working Out Alone (1v0)</h2>
            <hr/>
            {!isRunning ?
                <h4 className="text-center w-400px m-auto">Directions: Put your headphones on and perform a repetitive
                    dribble move (ie. scissor dribble) while the timer counts down. Once the timer runs out, execute the
                    decision given to you as quickly as you can. Then perform a different dribble awaiting for your next
                    rep.</h4> : ''}

            <h3>Decisions: {exercises.map((exercise: Exercise) => {
                return <div>{exercise.name}</div>
            })}
                <Link to="/exercises">(edit)</Link></h3>

        </div>

        <div>
            <label>Time Between Reps (sec.)</label>
            <input type="number" name="secondsBetweenRepsSetting" value={repDuration}
                   onChange={onTimeBetweenRepsChange}/>
        </div>

        {currentExercise && isRunning ? <h1>{currentExercise}</h1> : ''}

        {isRunning ? <div><p>Next repetition in: {timerDisplay} seconds</p></div> : ''}

        {!isRunning ? <div>
            <button onClick={start}>Start Workout</button>
        </div> : ''}

        {isRunning ? <div>
            <button onClick={stopWorkout}>STOP Workout</button>
        </div> : ''}

        <div>
            <img src={bball_img} className={logoClassNames} alt="logo"/>
        </div>
    </React.Fragment>
}

export default WorkoutPage
