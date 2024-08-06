import React, { useState, useEffect, useMemo, useRef } from "react";
import { generate } from "random-words";
import useTyping from "react-typing-game-hook";
import { FiRefreshCcw } from "react-icons/fi";

const generateRandomWords = function () {
  return generate(1000).join(" ");
};

const HomePageReplica = () => {
  const [duration, setDuration] = useState(0);
  const [typingInput, setTypingInput] = useState("");
  const [typedWrong, setTypeWrong] = useState(false);
  const inputRef = useRef(null);
  const text = useMemo(() => generateRandomWords(), []);
  const {
    states: {
      charsState,
      currIndex,
      phase,
      correctChar,
      errorChar,
      startTime,
      endTime,
    },
    actions: { insertTyping, resetTyping },
  } = useTyping(text, {
    skipCurrentWordOnSpace: true,
  });

  const [typedWords, setTypedWords] = useState(0);

  useEffect(() => {
    setTypeWrong((prev) => {
      let hasError = false;
      for (let i = 0; i < typingInput.length; i++) {
        let char = typingInput[i];
        let correctChar = text[currIndex + i];
        let diff = char !== correctChar;
        if (diff) {
          hasError = true;
          break;
        }
      }
      if (hasError !== prev) {
        return !prev;
      } else {
        return prev;
      }
    });
  }, [typingInput, currIndex, text]);

  // Reset
  const reset = () => {
    resetTyping();
    setTypingInput("");
  };

  const submitWord = () => {
    if (typedWords >= 15) {
      const elements = document.querySelectorAll(".typed");
      elements.forEach((element) => {
        element.classList.add("scroll-out");
      });

      setTimeout(() => {
        elements.forEach((element) => element.remove());
      }, 200);
      setTypedWords(0);
    }
    for (let i = currIndex; i < currIndex + typingInput.length; i++) {
      insertTyping(typingInput[i - currIndex]);
    }
    insertTyping(" ");
    setTypingInput("");
    setTypeWrong(false);
    setTypedWords((prev) => prev + 1);
  };

  // Set WPM
  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  return (
    <>
      <div>
        <div className="bg-secondary-back w-[80%] ml-auto mr-auto mt-10 h-[130px] overflow-hidden rounded-md typing-test outline-none pt-1 pb-1 text-left pl-3 pr-3">
          <div className="pl-2 mt-1 rounded-md pr-2 pt-4 overflow-hidden typing-test outline-none">
            {text.split("").map((letter, index) => {
              let state = charsState[index];
              let styling = "text-red-500"; // default to red for incorrect characters
              if (state === 1) {
                styling = "text-green-500"; // green for correct characters
              } else if (state === 0) {
                styling = "text-white"; // neutral color for untyped characters
              }

              let cursorClass = index === currIndex ? "cursor" : "";
              let typedClass = index < currIndex ? "typed" : "";

              return (
                <span
                  key={letter + index}
                  className={`${styling} ${cursorClass} ${typedClass}`}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
        <div className="w-[80%] flex gap-2 ml-auto mr-auto mt-4">
          <input
            type="text"
            name=""
            className="mr-[12px] text-white h-[60px] w-[60%] bg-secondary-back focus:outline-none focus:ring-2 ring-[#1585e0] ring-2  rounded-md mb-2 text-[21px] p-4"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                reset();
              } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                submitWord();
              }
            }}
            onChange={(e) => {
              setTypingInput(e.target.value);
            }}
            value={typingInput}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <div className="h-[60px] bg-secondary-back p-5 mr-[12px] rounded-md w-[120px] text-lg flex justify-center items-center">
            <span>WPM</span>
          </div>
          <div className="h-[60px] w-[120px] bg-secondary-back p-5 rounded-md text-lg mr-[12px] flex justify-center items-center">
            <span>Timer</span>
          </div>
          <button
            className="h-[60px] w-[85px] bg-secondary-back rounded-md hover:bg-secondary-blue flex justify-center items-center"
            onClick={null}
          >
            {/* <span ref={iconRef}>
              <FiRefreshCcw size={30} />
            </span> */}
          </button>
        </div>
      </div>
      <p className="text-sm">
        {phase === 2 && startTime && endTime ? (
          <>
            <span className="text-green-500 mr-4">
              WPM: {Math.round(((60 / duration) * correctChar) / 5)}
            </span>
            <span className="text-blue-500 mr-4">
              Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
            </span>
            <span className="text-yellow-500 mr-4">Duration: {duration}s</span>
          </>
        ) : null}
        <span className="mr-4"> Current Index: {currIndex}</span>
        <span className="mr-4"> Correct Characters: {correctChar}</span>
        <span className="mr-4"> Error Characters: {errorChar}</span>
      </p>
    </>
  );
};

export default HomePageReplica;
