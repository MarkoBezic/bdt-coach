import { v4 as uuidv4 } from 'uuid';

export const EXPLAIN_REP_DURATION = "How long does one rep take to complete?"

export const URL_HOME = "/"
export const URL_WORKOUT = "/workout"
export const URL_EXERCISES = "/exercises"

export const INITIAL_SECONDS_BETWEEN_REPS: number = 5
export const DEFAULT_EXERCISES_ARR: Array<Exercise> = [
    {
        id: uuidv4(),
        name: "Shoot",
        rep_duration: 8,
        color: '#FF0000',
    },
    {
        id: uuidv4(),
        name: "Pass",
        rep_duration: 3,
        color: '#80ff00',
    },
    {
        id: uuidv4(),
        name: "Drive",
        rep_duration: 7,
        color: '#0000FF',
    }
]
export const FINAL_NUMBERS_TO_SPEAK: number = 3
