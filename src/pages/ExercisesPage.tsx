import React from 'react';
import SectionNavbar from "../components/SectionNavbar";
import useLocalStorage, {LOCAL_STORAGE_KEY_EXERCISES} from "../hooks/useLocalStorage";
import {DEFAULT_EXERCISES_ARR} from "../AppDefaults";

export default function ExercisesPage(props: any) {

    const [exercises, setExercises] = useLocalStorage(LOCAL_STORAGE_KEY_EXERCISES, DEFAULT_EXERCISES_ARR)

    return <React.Fragment>
        <SectionNavbar />
        <div>
            <h3>Decisions: {exercises.join(", ")}</h3>
        </div>
    </React.Fragment>
}
