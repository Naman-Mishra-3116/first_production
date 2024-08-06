import { useState } from "react";
import {
  durationArray,
  wordTypeArray,
  numbersArray,
  punctuationArray,
  hideTimerArray,
  hideWPMArray,
} from "../utils/Settings";

export const useSettingGameHook = function () {
  const [time, setTime] = useState(
    () => durationArray[+localStorage.getItem("time")].intent || 60
  );
  const [wordType, setWordType] = useState(
    () => wordTypeArray[+localStorage.getItem("wordType") || 0].intent || true
  );
  const [number, setNumber] = useState(
    () => numbersArray[+localStorage.getItem("number") || 1].intent || false
  );
  const [punc, setPunc] = useState(
    () =>
      punctuationArray[+localStorage.getItem("punctuation") || 1].intent ||
      false
  );
  const [showWPM, setShowWPM] = useState(
    () => hideWPMArray[+localStorage.getItem("showwpm") || 0].intent
  );
  const [showTimer, setShowTimer] = useState(
    () => hideTimerArray[+localStorage.getItem("showTimer") || 0].intent
  );

  return {
    time,
    setTime,
    wordType,
    setWordType,
    number,
    setNumber,
    punc,
    setPunc,
    showWPM,
    setShowWPM,
    showTimer,
    setShowTimer,
    durationArray,
    wordTypeArray,
    numbersArray,
    punctuationArray,
    hideTimerArray,
    hideWPMArray,
  };
};
