import React, { forwardRef } from "react";
const TextBox = forwardRef(({ charsState, currIndex, text }, ref) => {
  return (
    <div className="bg-secondary-back w-[80%] ml-auto mr-auto mt-10 h-[130px] overflow-hidden rounded-md typing-test outline-none pt-1 pb-1 text-left pl-3 pr-3">
      <div
        className="pl-2 mt-1 rounded-md pr-2 pt-4 overflow-hidden typing-test outline-none ml-2"
        ref={ref}
      >
        {text.split("").map((letter, index) => {
          let state = charsState[index];
          let styling = "text-[#ff6666]";
          if (state === 1) {
            styling = "text-[#81ff61]";
          } else if (state === 0) {
            styling = "text-white";
          }

          let cursorClass = index === currIndex ? "cursor" : "";
          let typedClass = index < currIndex ? "typed" : "";
          return (
            <span
              key={index + letter}
              className={`${styling} ${cursorClass} ${typedClass}`}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
});
export default TextBox;
