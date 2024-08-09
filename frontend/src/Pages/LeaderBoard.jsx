import React from "react";
import { useState, useEffect } from "react";
import { createToast } from "../../utils/createToast";
import LeaderRow from "../UI/LeaderRow";
import { link } from "../../utils/backLink";
const LeaderBoard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchLeaderBoardData = async () => {
      try {
        const response = await fetch(`${link}/getLeaderBoardData`);
        const { message, error, success, data } = await response.json();
        if (success === true) {
          setData(data);
        } else if (error) {
          createToast(message, "error");
        }
      } catch (error) {
        createToast(error.message, "error");
      }
    };
    fetchLeaderBoardData();
  }, []);
  return (
    <div className="flex flex-col">
      <p className="mt-10 bg-secondary-back text-center px-4 py-2 self-center rounded-md mb-5">
        All-Time Leaderboard
      </p>
      <table className="w-[80%] ml-auto mr-auto mt-5 font-normal">
        <thead className="bg-secondary-back text-md font-normal rounded-lg">
          <tr className="rounded-sm">
            <th className="p-[7.5px]">Rank</th>
            <th className="p-[7.5px]">User</th>
            <th className="p-[7.5px]">WPM</th>
            <th className="p-[7.5px]">Accuracy</th>
            <th className="p-[7.5px]">Time</th>
            <th className="p-[7.5px]">Taken</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              let rank = index + 1;
              if (index === 0) {
                rank = "🥇";
              } else if (index === 1) {
                rank = "🥈";
              } else if (index === 2) {
                rank = "🥉";
              }
              return (
                <LeaderRow
                  key={index}
                  isOdd={index % 2 !== 0}
                  Rank={rank}
                  wpm={item.wpm}
                  accuracy={item.accuracy}
                  time={item.time}
                  taken={item.taken}
                  user={item.name}
                />
              );
            })}
        </tbody>
      </table>
      {data === null ? <p className="text-center mt-4 text-lg">Fetching Data <span className="animate-pulse">...</span></p> : null}
    </div>
  );
};

export default LeaderBoard;
