import React from "react";

const SummaryList = ({correctChar,errorChar,time,data}) => {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        <li className="text-3xl mb-4">
          <span className="font-bold text-[40px]">
            {data !== null ? Math.round((correctChar / 4) * (60 / time)) : 0}{" "}
            <span className="font-normal text-2xl ml-2">WPM</span>
          </span>
        </li>
        <li className="flex justify-between bg-secondary-back px-4 py-2 rounded-md w-[250px]">
          <p>Raw WPM</p>
          {data === null ? (
            <span>&mdash;</span>
          ) : (
            <span>
              {Math.round((correctChar + errorChar) / 4 / (time / 60))}
            </span>
          )}
        </li>
        <li className="flex justify-between bg-primary-back px-4 py-2 rounded-md w-[250px]">
          <p>Accuracy</p>
          <p>
            {data === null ? (
              <span>&mdash;</span>
            ) : (
              <span>
                {Math.round((correctChar * 100) / (correctChar + errorChar))}
                &nbsp;%
              </span>
            )}
          </p>
        </li>
        <li className="flex justify-between bg-secondary-back px-4 py-2 w-[250px] rounded-md">
          <p>Correct characters</p>
          <p>{data === null ? <span>&mdash;</span> : correctChar}</p>
        </li>
        <li className="flex justify-between px-4 py-2 rounded-md w-[250px]">
          <p>Incorrect characters</p>
          <p>{data === null ? <span>&mdash;</span> : errorChar}</p>
        </li>
      </ul>
    </div>
  );
};

export default SummaryList;
