import {useEffect, useState} from "react";

export default function useLocalStorage(localStorageKey: string, initialState: any) {
    useState(localStorageKey)
    const item: string = localStorage.getItem(localStorageKey) || initialState
    const valueAsObject: string = JSON.parse(item)
    const [value, setValue] = useState<any>(valueAsObject);

    useEffect(() => {
        const valueAsString = JSON.stringify(value)
        localStorage.setItem(localStorageKey, valueAsString);
    }, [value]);

    return [value, setValue]
}
