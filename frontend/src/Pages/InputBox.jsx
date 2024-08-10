import React, { forwardRef } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useInputHook } from "../Hooks/useInputHook";

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
    const {
      iconRef,
      timer,
      wpm,
      timing,
      calculateWPM,
      handleInputChange,
      onClickResetButton,
    } = useInputHook(
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
    );

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
          <span className="transition-opacity duration-300 ease-in-out">
            {wpm ? (
              <>
                {calculateWPM()} <span className="text-[14px]">WPM</span>
              </>
            ) : null}
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
