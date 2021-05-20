import React from 'react';
import SectionNavbar from "../components/SectionNavbar";
import useLocalStorage from "../hooks/useLocalStorage";
import {DEFAULT_EXERCISES_ARR} from "../AppDefaults";

export default function ExercisesPage(props: any) {

    const [exercises, setExercises] = useLocalStorage('bdt_exercises_arr', DEFAULT_EXERCISES_ARR)

    return <React.Fragment>
        <SectionNavbar />
        <div>
            <h3>Decisions: {exercises.join(", ")}</h3>
        </div>
    </React.Fragment>
}
