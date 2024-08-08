import React from "react";

const LeaderRow = ({ isOdd, Rank, user, wpm, accuracy, time, taken }) => {
  return (
    <tr className="rounded-lg">
      <td className={`p-[9.5px] ${isOdd ? "bg-secondary-back" : null}`}>
        {Rank}
      </td>
      <td className={`p-[9.5px] ${isOdd ? "bg-secondary-back" : null}`}>
        {user}
      </td>
      <td className={`p-[9.5px] ${isOdd ? "bg-secondary-back" : null}`}>{wpm}</td>
      <td className={`p-[9.5px] ${isOdd ? "bg-secondary-back" : null}`}>
        {" "}
        {accuracy}
        {" %"}{" "}
      </td>

      <td className={`p-[9.5px] ${isOdd ? "bg-secondary-back" : null} `}>
        {Math.floor(time / 60)}:{time % 60}
      </td>
      <td className={`p-[9.5px] ${isOdd ? "bg-secondary-back" : null}`}>
        {taken}
      </td>
    </tr>
  );
};

export default LeaderRow;
