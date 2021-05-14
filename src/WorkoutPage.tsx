import React, {useState} from 'react'
import bball_img from "./images/bball_220x220.png"
import useTimer from "./hooks/useTimer";
import useStateWithLocalStorage from "./hooks/useLocalStorage";

const DEFAULT_SECONDS_BETWEEN_REPS: number = 10
const ANNOUNCE_FINAL_NUMBERS: number = 3

const speakText = (text: string, useAudio: boolean) => {
    console.log(`Saying: ${text}; useAudio: ${useAudio}`)
    if (useAudio) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
}

function WorkoutPage(props: any) {
    const [currentExercise, setCurrentExercise] = useState<null | string>(null)
    const [useAudio] = useState(true)
    const [exercises, setExercises] = useState(["Shoot", "Pass", "Drive",])

    const [secondsBetweenRepsSetting, setSecondsBetweenRepsSetting] = useState(DEFAULT_SECONDS_BETWEEN_REPS)

    const {secondsLeft, isRunning, start, stop} = useTimer({
        duration: secondsBetweenRepsSetting,
        onExpire: () => sayRandomExerciseName(),
        onTick: () => handleTick(),
    });

    const sayRandomExerciseName = () => {
        let index: number = getRandomInt(exercises.length)
        let exerciseName: string = exercises[index]
        setCurrentExercise(exerciseName)
        speakText(exerciseName, useAudio)
    }

    const handleTick = () => {
        const sec = secondsLeft - 1
        if(sec <= ANNOUNCE_FINAL_NUMBERS) {
            speakText(sec.toString(), useAudio)
        }
    }

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    const onTimeBetweenRepsChange = (event: any) => {
        const secondsBetweenRepsSettingString = event.target.value;
        const secondsBetweenRepsSettingInt = parseInt(secondsBetweenRepsSettingString)
        setSecondsBetweenRepsSetting(secondsBetweenRepsSettingInt)
    }

    const logoClassNames = isRunning ? "App-logo App-logo-animate" : "App-logo"

    const timerDisplay = secondsLeft;

    return <React.Fragment>
        <div>
            <h2>Make A Decision:</h2>
            <h3>{exercises.join(", ")}</h3>
        </div>

        <div>
            <label>Time Between Reps (sec.)</label>
            <input type="number" name="secondsBetweenRepsSetting" value={secondsBetweenRepsSetting} onChange={onTimeBetweenRepsChange}/>
        </div>

        <img src={bball_img} className={logoClassNames} alt="logo"/>

        {currentExercise && isRunning ? <h1>{currentExercise}</h1> : ''}

        {isRunning ? <div><p>Next repetition in: {timerDisplay} seconds</p></div> : ''}

        {!isRunning ? <div><button onClick={start}>Start Workout</button></div> : ''}

        {isRunning ? <div><button onClick={stop}>STOP Workout</button></div> : ''}
    </React.Fragment>
}

export default WorkoutPage
