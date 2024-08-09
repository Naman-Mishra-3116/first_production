import { useState, useEffect, useRef } from "react";
export const useInputHook = function (
  duration,
  showWPM,
  showTimer,
  updateKey,
  data,
  setData,
  errorChar,
  correctChar,
  rightWords,
  wrongWords,
  onChangeInputHandler,
  ref
) {
  const iconRef = useRef();
  const [timer, setTimer] = useState(duration);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [wpm, showSpeed] = useState(showWPM);
  const [timing, showTiming] = useState(showTimer);

  useEffect(() => {
    setTimer(duration);
    setElapsedTime(0);
    showSpeed(showWPM);
    showTiming(showTimer);
  }, [duration, showTimer, showWPM]);

  useEffect(() => {
    let timerInterval;

    if (timer === 0 && hasStarted) {
      data.current.push({
        wpm: Math.round(correctChar / 5 / (elapsedTime / 60)),
        accuracy: Math.round((correctChar * 100) / (correctChar + errorChar)),
        cWords: rightWords,
        iWords: wrongWords,
      });

      setData(data.current);
      ref.current.blur();
      ref.current.style.pointerEvents = "none";
    }

    if (hasStarted) {
      if (timer > 0) {
        timerInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
          setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
      } else {
        clearInterval(timerInterval);
      }
    }

    return () => clearInterval(timerInterval);
  }, [timer, hasStarted]);

  const onClickResetButton = () => {
    if (iconRef.current) {
      iconRef.current.classList.add("rotate-animation");

      setTimeout(() => {
        if (iconRef.current) {
          iconRef.current.classList.remove("rotate-animation");
        }
        updateKey((prev) => String(prev + 1).toString());
        setHasStarted(false);
        setElapsedTime(0);
      }, 600);
    }
  };

  const handleInputChange = (e) => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    onChangeInputHandler(e);
  };

  const calculateWPM = () => {
    const adjustedElapsedTime = Math.max(elapsedTime, 1);
    return isNaN(Math.round(correctChar / 5 / (adjustedElapsedTime / 60)))
      ? 0
      : Math.round(correctChar / 5 / (adjustedElapsedTime / 60));
  };

  return {
    iconRef,
    timer,
    elapsedTime,
    wpm,
    timing,
    calculateWPM,
    handleInputChange,
    onClickResetButton,
  };
};
