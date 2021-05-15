import {useEffect, useState} from "react";

export default function useStateWithLocalStorage(localStorageKey, initialState) {
  const itemFromStorage = localStorage.getItem(localStorageKey) || initialState
  const valueAsObject = JSON.parse(itemFromStorage)

  function setItem(item) {
    if(!isNaN(item)) {
      const valueAsString = JSON.stringify(item)
      localStorage.setItem(localStorageKey, valueAsString);
    }
  }

  return [valueAsObject, setItem];
};
