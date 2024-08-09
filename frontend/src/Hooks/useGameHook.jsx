import { useEffect, useState, useRef, useMemo } from "react";
import useTyping from "react-typing-game-hook";
import { generate } from "random-words";

const generateRandomWords = () => generate(1000).join(" ");

export const useGameHook = function (duration) {
  const divRef = useRef(null);
  const inputRef = useRef(null);
  const text = useMemo(() => generateRandomWords(), []);
  const [, setTypeWrong] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const maxWidth = useRef();
  const [typingInput, setTypingInput] = useState("");
  const typedWord = useRef(0);
  const correctWords = useRef(0);
  const incorrectWords = useRef(0);
  const prevIncorrectchars = useRef(0);
  const graphData = useRef([]);
  const totalTypedWord = useRef(0);

  useEffect(() => {
    maxWidth.current = divRef.current.getBoundingClientRect().right - 150;
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      maxWidth.current = divRef.current.getBoundingClientRect().right;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    states: { charsState, currIndex, correctChar, errorChar },
    actions: { insertTyping },
  } = useTyping(text, {
    skipCurrentWordOnSpace: true,
  });

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

  const submitWord = () => {
    try {
      for (let i = currIndex; i < currIndex + typingInput.length; i++) {
        insertTyping(typingInput[i - currIndex]);
      }
      let cursorPoint = 0;
      const value = document.querySelector(".cursor");
      if (value) {
        cursorPoint = value.getBoundingClientRect().right;
      }
      insertTyping(" ");
      setTypingInput("");
      setTypeWrong(false);

      if (cursorPoint + 100 >= maxWidth.current || typedWord.current > 14) {
        const elements = document.querySelectorAll(".typed");
        elements.forEach((element) => {
          element.classList.add("scroll-out");
        });

        setTimeout(() => {
          elements.forEach((element) => element.remove());
        }, 100);
        typedWord.current = -1;
      }
      if (prevIncorrectchars.current !== errorChar) {
        incorrectWords.current += 1;
      } else {
        correctWords.current += 1;
      }
      prevIncorrectchars.current = errorChar;
      typedWord.current += 1;
      graphData.current.push({
        wpm: Math.round((correctChar / 4) * (60 / duration)),
        accuracy: Number.isNaN(
          Math.round((correctChar * 100) / (correctChar + errorChar))
        )
          ? 0
          : Math.round((correctChar * 100) / (correctChar + errorChar)),
        cWords: correctWords.current,
        iWords: incorrectWords.current,
        wordNumber: totalTypedWord.current,
      });
      totalTypedWord.current += 1;
    } catch (error) {
      console.log(error.message);
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      updateKey((prev) => String(prev + 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      submitWord();
    }
  };

  const onChangeInputHandler = (e) => {
    setTypingInput(e.target.value);
  };

  return {
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
    graphData,
    submitWord,
  };
};
