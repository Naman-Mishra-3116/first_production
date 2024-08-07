import React from "react";
import { useGameHook } from "../Hooks/useGameHook";
import { useState } from "react";
import InputBox from "./InputBox";
import TextBox from "./TextBox";
import { useSettingGameHook } from "../Hooks/useGameSettingHook";
import SettingButtonList from "../UI/SettingButtonList";
import SummaryList from "../UI/SummaryList";
import LineGraph from "./../UI/LineGraph";
import DefaultLineGraph from "../UI/DefaultLineGraph";

const HomePage = ({ updateKey }) => {
  const {
    time,
    setTime,
    setWordType,
    setNumber,
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
  } = useSettingGameHook();

  const {
    divRef,
    inputRef,
    text,
    correctWords,
    incorrectWords,
    correctChar,
    errorChar,
    charsState,
    currIndex,
    typingInput,
    onChangeInputHandler,
    onKeyDownHandler,
    submitWord,
    graphData,
  } = useGameHook(time);

  const [data, setData] = useState(null);

  return (
    <div>
      <TextBox
        ref={divRef}
        charsState={charsState}
        currIndex={currIndex}
        text={text}
      />
      <InputBox
        ref={inputRef}
        onKeyDownHandler={onKeyDownHandler}
        correctChar={correctChar}
        errorChar={errorChar}
        duration={time}
        typingInput={typingInput}
        onChangeInputHandler={onChangeInputHandler}
        updateKey={updateKey}
        index={currIndex}
        rightWords={correctWords.current}
        wrongWords={incorrectWords.current}
        data={graphData}
        setData={setData}
        showWPM={showWPM}
        showTimer={showTimer}
        submitWord={submitWord}
      />

      <div className="flex gap-[40px] mt-[4rem] ml-auto mr-auto w-[80%] justify-center items-center">
        <SummaryList
          errorChar={errorChar}
          correctChar={correctChar}
          time={time}
          data={data}
        />

        <SettingButtonList
          durationArray={durationArray}
          setTime={setTime}
          wordTypeArray={wordTypeArray}
          setWordType={setWordType}
          numbersArray={numbersArray}
          setNumber={setNumber}
          punctuationArray={punctuationArray}
          setPunc={setPunc}
          hideWPMArray={hideWPMArray}
          setShowWPM={setShowWPM}
          hideTimerArray={hideTimerArray}
          setShowTimer={setShowTimer}
          updateKey={updateKey}
        />
      </div>

      <div className="ml-auto mr-auto h-[350px] mt-[100px] justify-stretch flex w-[80%]">
        {data !== null ? (
          <LineGraph
            data={data}
            time={time}
            errorChar={errorChar}
            correctChar={correctChar}
            raw={Math.round((correctChar + errorChar) / 4 / (time / 60))}
          />
        ) : (
          <DefaultLineGraph />
        )}
      </div>
    </div>
  );
};

export default HomePage;
