import React from "react";

const LeaderBoard = ({ data = null }) => {
  return (
    <div className="flex flex-col">
      <p className="mt-10 bg-secondary-back text-center px-4 py-2 self-center rounded-md mb-5">
        Daily LeaderBoard
      </p>
      <table className="w-[80%] ml-auto mr-auto mt-5 font-normal">
        <thead className="bg-secondary-back text-md font-normal rounded-lg">
          <tr className="rounded-sm">
            <th className="p-[6px]">Rank</th>
            <th className="p-[6px]">User</th>
            <th className="p-[6px]">WPM</th>
            <th className="p-[6px]">Accuracy</th>
            <th className="p-[6px]">Time</th>
            <th className="p-[6px]">Taken</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default LeaderBoard;
