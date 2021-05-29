import { v4 as uuidv4 } from 'uuid';

export const EXPLAIN_REP_DURATION = "How long does one rep take to complete?"

export const URL_HOME = "/"
export const URL_WORKOUT = "/workout"
export const URL_EXERCISES = "/exercises"

export const COLOR_RED = "#FF0000"
export const COLOR_GREEN = "#80ff00"
export const COLOR_BLUE = "#0000FF"

export const INITIAL_SECONDS_BETWEEN_REPS: number = 5
export const DEFAULT_EXERCISES_ARR: Array<Exercise> = [
    {
        id: uuidv4(),
        name: "Shot",
        rep_duration: 10,
        color: COLOR_RED,
    },
    {
        id: uuidv4(),
        name: "Lay Up",
        rep_duration: 10,
        color: COLOR_GREEN,
    },
    {
        id: uuidv4(),
        name: "Pull Up",
        rep_duration: 10,
        color: COLOR_BLUE,
    }
]
export const FINAL_NUMBERS_TO_SPEAK: number = 3
