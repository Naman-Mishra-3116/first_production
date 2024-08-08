import React from "react";

const Row = ({ wpm, accuracy, raw, cChar, iChar, time, taken, isOdd }) => {
  return (
    <tr className="rounded-lg">
      <td className={`p-[9px] ${isOdd ? "bg-secondary-back" : null}`}>{wpm}</td>
      <td className={`p-[9px] ${isOdd ? "bg-secondary-back" : null}`}> {accuracy}{" %"} </td>
      <td className={`p-[9px] ${isOdd ? "bg-secondary-back" : null}`}>{raw}</td>
      <td className={`p-[9px] ${isOdd ? "bg-secondary-back" : null}`}>  {<span className="text-[#81ff57]">{cChar}</span>} / {<span className="text-[#ff6666]">{iChar}</span>}</td>
      <td className={`p-[9px] ${isOdd ? "bg-secondary-back" : null} `}>{Math.floor(time/60)}:{time%60}</td>
      <td className={`p-[9px] ${isOdd ? "bg-secondary-back" : null}`}>{taken}</td>
    </tr>
  );
};

export default Row;
