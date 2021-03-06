import {useEffect, useState} from "react";

export const LOCAL_STORAGE_KEY_EXERCISES = 'bdt_exercises_arr'
export const LOCAL_STORAGE_KEY_DURATION = 'bdt_rep_duration_int'

export default function useLocalStorage(localStorageKey: string, initialState: any) {
    useState(localStorageKey)
    const item: string = localStorage.getItem(localStorageKey) || JSON.stringify(initialState)
    const valueAsObject: string = JSON.parse(item)
    const [value, setValue] = useState<any>(valueAsObject);

    useEffect(() => {
        const valueAsString = JSON.stringify(value)
        localStorage.setItem(localStorageKey, valueAsString);
    }, [localStorageKey, value]);

    return [value, setValue]
}
