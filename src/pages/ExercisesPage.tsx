import React from 'react';
import SectionNavbar from "../components/SectionNavbar";
import useLocalStorage, {LOCAL_STORAGE_KEY_EXERCISES} from "../hooks/useLocalStorage";
import {DEFAULT_EXERCISES_ARR} from "../AppDefaults";

export default function ExercisesPage(props: any) {

    const [exercises, setExercises] = useLocalStorage(LOCAL_STORAGE_KEY_EXERCISES, DEFAULT_EXERCISES_ARR)

    return <React.Fragment>
        <SectionNavbar />
        <div>
            <h3>Exercises</h3>
            { exercises.map((exercise: Exercise, index: number) => {
                const exerciseDiv = <div>{exercise.name} - {exercise.rep_duration}sec. - <span style={{backgroundColor: exercise.color}}>{exercise.color}</span></div>
                return exerciseDiv
            })}
        </div>
    </React.Fragment>
}
