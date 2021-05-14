import { useState } from 'react';
import Validate from "../utils/Validate";
import useInterval from "./useInterval";

export default function useTimer({ duration: timerDuration, onExpire, onTick}) {
  const [secondsLeft, setSecondsLeft] = useState(timerDuration)
  const [isRunning, setIsRunning] = useState(false)

  function start() {
    setIsRunning(true)
    setSecondsLeft(timerDuration)
  }
  function stop() {
    setIsRunning(false)
  }

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
  }

  useInterval(() => {
    const secondsMinusOne = secondsLeft - 1;
    setSecondsLeft(secondsMinusOne)
    if(secondsMinusOne <= 0) {
      setSecondsLeft(timerDuration) // Reset timer automatically
      handleExpire()
    } else {
      Validate.onTick(onTick) && onTick();
    }
  }, isRunning ? 1000 : null)

  return {secondsLeft, isRunning, start, stop, }
}
