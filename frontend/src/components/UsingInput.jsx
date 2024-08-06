// import React, { useEffect, useMemo, useRef, useState } from "react";
// import useTyping from "react-typing-game-hook";
// import { generate } from "random-words";
// import "./styles.css";

// const generateRandomWords = () => {
//   return generate(1000).join(" ");
// };

// const TypeInput = () => {
//   const [duration, setDuration] = useState(0);
//   const [typingInput, setTypingInput] = useState("");
//   const [typedWrong, setTypeWrong] = useState(false);
//   const inputRef = useRef(null);
//   const text = useMemo(() => generateRandomWords(), []);
//   const {
//     states: {
//       charsState,
//       currIndex,
//       phase,
//       correctChar,
//       errorChar,
//       startTime,
//       endTime,
//     },
//     actions: { insertTyping, resetTyping },
//   } = useTyping(text, {
//     skipCurrentWordOnSpace: true,
//   });

//   const [typedWords, setTypedWords] = useState(0);

//   useEffect(() => {
//     setTypeWrong((prev) => {
//       let hasError = false;
//       for (let i = 0; i < typingInput.length; i++) {
//         let char = typingInput[i];
//         let correctChar = text[currIndex + i];
//         let diff = char !== correctChar;
//         if (diff) {
//           hasError = true;
//           break;
//         }
//       }
//       if (hasError !== prev) {
//         return !prev;
//       } else {
//         return prev;
//       }
//     });
//   }, [typingInput, currIndex, text]);

//   // Reset
//   const reset = () => {
//     resetTyping();
//     setTypingInput("");
//   };

//   // Submit inputted word
//   const submitWord = () => {
//     if (typedWords >= 15) {
//       const elements = document.querySelectorAll(".typed");
//       elements.forEach((element) => {
//         element.classList.add("scroll-out");
//       });

//       setTimeout(() => {
//         elements.forEach((element) => element.remove());
//       }, 200);
//       setTypedWords(0);
//     }
//     for (let i = currIndex; i < currIndex + typingInput.length; i++) {
//       insertTyping(typingInput[i - currIndex]);
//     }
//     insertTyping(" ");
//     setTypingInput("");
//     setTypeWrong(false);
//     setTypedWords((prev) => prev + 1);
//   };

//   // Set WPM
//   useEffect(() => {
//     if (phase === 2 && endTime && startTime) {
//       setDuration(Math.floor((endTime - startTime) / 1000));
//     } else {
//       setDuration(0);
//     }
//   }, [phase, startTime, endTime]);

//   return (
//     <div>
//       <div
//         className="text-xl font-serif select-none w-[1000px] ml-auto mr-auto overflow-hidden"
//         onClick={() => {
//           inputRef.current.focus();
//         }}
//       >
//         <div className="tracking-wide mb-2 h-[110px] overflow-hidden">
//           {text.split("").map((letter, index) => {
//             let state = charsState[index];
//             let styling = "text-red-500"; // default to red for incorrect characters
//             if (state === 1) {
//               styling = "text-green-500"; // green for correct characters
//             } else if (state === 0) {
//               styling = "text-gray-700"; // neutral color for untyped characters
//             }

//             let cursorClass = index === currIndex ? "cursor" : "";
//             let typedClass = index < currIndex ? "typed" : "";

//             return (
//               <span
//                 key={letter + index}
//                 className={`${styling} ${cursorClass} ${typedClass}`}
//               >
//                 {letter}
//               </span>
//             );
//           })}
//         </div>
//         <div className="mb-2">
//           <input
//             type="text"
//             ref={inputRef}
//             onKeyDown={(e) => {
//               if (e.key === "Escape") {
//                 e.preventDefault();
//                 reset();
//               } else if (e.key === "Enter" || e.key === " ") {
//                 e.preventDefault();
//                 submitWord();
//               }
//             }}
//             onChange={(e) => {
//               setTypingInput(e.target.value);
//             }}
//             value={typingInput}
//             autoCorrect="off"
//             autoCapitalize="off"
//             spellCheck={false}
//            
//           />
//         </div>
//       </div>
//       <p className="text-sm">
//         {phase === 2 && startTime && endTime ? (
//           <>
//             <span className="text-green-500 mr-4">
//               WPM: {Math.round(((60 / duration) * correctChar) / 5)}
//             </span>
//             <span className="text-blue-500 mr-4">
//               Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
//             </span>
//             <span className="text-yellow-500 mr-4">Duration: {duration}s</span>
//           </>
//         ) : null}
//         <span className="mr-4"> Current Index: {currIndex}</span>
//         <span className="mr-4"> Correct Characters: {correctChar}</span>
//         <span className="mr-4"> Error Characters: {errorChar}</span>
//       </p>
//     </div>
//   );
// };

// export default TypeInput;


import React, { useState, useEffect, useMemo, useRef } from "react";
import { generate } from "random-words";
import useTypingGame from "react-typing-game-hook";
import { FiRefreshCcw } from "react-icons/fi";

const generateRandomWords = function () {
  return generate(1000).join(" ");
};

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const textDivRef = useRef(null);
  const totalWidth = useRef(0);
  const [load, setLoad] = useState(false);
  const iconRef = useRef();
  const handleChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
  };
  const text = useMemo(() => generateRandomWords(), [load]);

  let maxWidth = 0;
  useEffect(() => {
    maxWidth = textDivRef.current.offsetWidth - 35;
    textDivRef.current.focus();
  });

  const handleReset = () => {
    if (iconRef.current) {
      setLoad((prev) => !prev);
      setInputText("");
      iconRef.current.classList.add("rotate-animation");
      totalWidth.current = 0;
      setTimeout(() => {
        if (iconRef.current) {
          iconRef.current.classList.remove("rotate-animation");
        }
      }, 1000);
    } else {
      console.error("iconRef.current is null");
    }
  };

  const {
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime,
    },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text);

  const handleKey = (key) => {
    if (key === "Escape") {
      resetTyping();
      setInputText("");
      totalWidth.current = 0;
    } else if (key === "Backspace") {
      deleteTyping(false);
      setInputText(inputText.slice(0, -1));
      if (currIndex >= 0) {
        const charElement = textDivRef.current.children[currIndex];
        if (charElement) {
          totalWidth.current -= charElement.offsetWidth;
        }
      }
    } else if (key === " ") {
      insertTyping(key);
      setInputText("");
    } else if (key.length === 1) {
      insertTyping(key);
      setInputText(inputText + key);
    }
  };

  useEffect(() => {
    if (currIndex >= 0) {
      const charElement = textDivRef.current.children[currIndex];
      if (charElement) {
        totalWidth.current += charElement.offsetWidth;
        if (
          (totalWidth.current >= maxWidth ||
            charElement.getBoundingClientRect().right >=
              textDivRef.current.getBoundingClientRect().right - 40) &&
          (currChar === " " || currIndex === text.length - 1)
        ) {
          const elements = document.querySelectorAll(".typed");
          elements.forEach((element) => {
            element.classList.add("scroll-out");
          });
          setTimeout(() => {
            elements.forEach((element) => element.remove());
          }, 500);

          totalWidth.current = 0;
        }
      }
    }
  }, [currIndex, currChar, text.length]);

  return (
    <>
      <div>
        <div className="bg-secondary-back w-[80%] ml-auto mr-auto mt-10 h-[130px] overflow-hidden rounded-md typing-test outline-none pt-1 pb-1 text-left pl-3 pr-3">
          <div
            className="pl-2 mt-1 rounded-md pr-2 pt-4 overflow-hidden typing-test outline-none"
            ref={textDivRef}
            onKeyDown={(e) => {
              handleKey(e.key);
              e.preventDefault();
            }}
            tabIndex={0}
          >
            {text.split("").map((char, index) => {
              let state = charsState[index];
              let color =
                state === 0 ? "white" : state === 1 ? "#81ff61" : "#ff6666";
              let className = `${currIndex > index ? "typed" : ""} ${
                currIndex === index ? "curr-letter" : ""
              }`;
              return (
                <span
                  key={char + index}
                  style={{ color }}
                  className={className}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
        <div className="w-[80%] flex gap-2 ml-auto mr-auto mt-4">
          <input
            type="text"
            name=""
            id=""
            className="mr-[12px] text-white h-[60px] w-[60%] bg-secondary-back focus:outline-none focus:ring-2 ring-[#1585e0] ring-2  rounded-md mb-2 text-[21px] p-4"
            ref={inputRef}
            value={inputText}
            onChange={handleChange}
          />
          <div className="h-[60px] bg-secondary-back p-5 mr-[12px] rounded-md w-[120px] text-lg flex justify-center items-center">
            <span>WPM</span>
          </div>
          <div className="h-[60px] w-[120px] bg-secondary-back p-5 rounded-md text-lg mr-[12px] flex justify-center items-center">
            <span>Timer</span>
          </div>
          <button
            className="h-[60px] w-[85px] bg-secondary-back rounded-md hover:bg-secondary-blue flex justify-center items-center"
            onClick={handleReset}
          >
            <span ref={iconRef}>
              <FiRefreshCcw size={30} />
            </span>
          </button>
        </div>
      </div>
      <pre>
        {JSON.stringify(
          {
            startTime,
            endTime,
            length,
            currIndex,
            currChar,
            correctChar,
            errorChar,
            phase,
          },
          null,
          2
        )}
      </pre>
    </>
  );
};

export default HomePage;
