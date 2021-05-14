import { useState } from 'react';
import Validate from "../utils/Validate";
import useInterval from "./useInterval";

export default function useTimer({ duration: timerDuration, onExpire }) {
  const [duration, setDuration] = useState(timerDuration)
  const [secondsLeft, setSecondsLeft] = useState(timerDuration)
  const [isRunning, setIsRunning] = useState(false)

  function start() {
    setIsRunning(true)
  }
  function stop() {
    setIsRunning(false)
  }

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
  }

  useInterval(() => {
    setSecondsLeft(secondsLeft - 1)
    if(secondsLeft <= 0) {
      setSecondsLeft(duration) // Reset timer automatically
      handleExpire()
    }
  }, isRunning ? 1000 : null)

  return {secondsLeft, isRunning, start, stop, }
}
