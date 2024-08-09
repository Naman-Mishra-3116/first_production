import React, { useEffect, useState, useRef, forwardRef } from "react";
import { FiRefreshCcw } from "react-icons/fi";

const InputBox = forwardRef(
  (
    {
      onKeyDownHandler,
      duration,
      correctChar,
      onChangeInputHandler,
      typingInput,
      updateKey,
      data,
      showWPM,
      showTimer,
      setData,
      errorChar,
      rightWords,
      wrongWords,
    },
    ref
  ) => {
    const iconRef = useRef();
    const [timer, setTimer] = useState(duration);
    const [hasStarted, setHasStarted] = useState(false);
    const [wpm, showSpeed] = useState(showWPM);
    const [timing, showTiming] = useState(showTimer);

    useEffect(() => {
      setTimer(duration);
      showSpeed(showWPM);
      showTiming(showTimer);
    }, [duration, showTimer, showWPM]);

    useEffect(() => {
      let timerInterval;
      if (timer === 0 && hasStarted === true) {
        data.current.push({
          wpm: Math.round((correctChar / 5) * (60 / duration)),
          accuracy: Math.round((correctChar * 100) / (correctChar + errorChar)),
          cWords: rightWords,
          iWords: wrongWords,
        });
        setData(data.current);
        ref.current.blur();
        ref.current.style.pointerEvents = "none";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (hasStarted) {
        if (timer > 0) {
          timerInterval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
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
        }, 600);
      }
    };

    const handleInputChange = (e) => {
      if (!hasStarted) {
        setHasStarted(true);
      }
      onChangeInputHandler(e);
    };

    return (
      <div className="w-[80%] flex gap-2 ml-auto mr-auto mt-4">
        <input
          type="text"
          className={`mr-[12px] text-white h-[60px] w-[60%] bg-secondary-back focus:outline-none focus:ring-[#1585e0] ring-2 ring-[#2b2b2b] rounded-md mb-2 text-[21px] p-4 `}
          ref={ref}
          onKeyDown={onKeyDownHandler}
          onChange={handleInputChange}
          value={typingInput}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        <div className="h-[60px] bg-secondary-back p-5 mr-[12px] rounded-md w-[120px] text-[22px] flex justify-center items-center">
          <span>
            {" "}
            {wpm ? (
              <>
                {Math.round((correctChar / 4) * (60 / duration))}{" "}
                <span className="text-[14px]">WPM</span>
              </>
            ) : null}{" "}
          </span>
        </div>
        <div className="h-[60px] w-[120px] bg-secondary-back p-5 rounded-md text-[22px] mr-[12px] flex justify-center items-center">
          <span>
            {timing
              ? `${Math.floor(timer / 60)}:${Math.floor(timer % 60)
                  .toString()
                  .padStart(2, "0")}`
              : null}
          </span>
        </div>
        <button
          className="h-[60px] w-[85px] bg-secondary-back rounded-md hover:bg-secondary-blue flex justify-center items-center"
          onClick={onClickResetButton}
        >
          <span ref={iconRef}>
            <FiRefreshCcw size={30} />
          </span>
        </button>
      </div>
    );
  }
);

export default InputBox;
