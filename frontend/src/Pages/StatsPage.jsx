import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "../UI/Row";

const StatsPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isAuth = useSelector((state) => state.valid.isAuthticated);
  const token = useSelector((state) => state.valid.jwtToken);

  useEffect(() => {
    const getDataAboutUser = async function () {
      try {
        const response = await fetch("http://localhost:5000/getTodayStats", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const { success, error, data } = await response.json();
        if (success) {
          setData(data.sort((a, b) => b.wpm - a.wpm));
        } else if (error) {
          setError(error.message);
        }
      } catch (error) {
        setError(error.message);
        console.log("Error in Fetching Data");
      }
    };

    if (isAuth && token) {
      getDataAboutUser();
    }
  }, [isAuth, token]);

  if (error) {
    return <div className="w-[80%] self-center mt-3">{error.message}</div>;
  }

  if (!isAuth && !token) {
    return (
      <div className="flex flex-col">
        <div className="w-[80%] self-center mt-3">
          <h2 className="mt-10 text-2xl"> Please login to see your results</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="mt-10 bg-secondary-back text-center px-4 py-2 self-center rounded-md mb-5">
        Today's Typing Stats
      </p>
      {isAuth === true && data !== null && (
        <table className="w-[80%] ml-auto mr-auto mt-5 font-normal">
          <thead className="bg-secondary-back text-md font-normal rounded-lg">
            <tr className="rounded-sm">
              <th className="p-[9px]">WPM</th>
              <th className="p-[9px]">Accuracy</th>
              <th className="p-[9px]">Raw WPM</th>
              <th className="p-[9px]">Characters</th>
              <th className="p-[9px]">Time</th>
              <th className="p-[9px]">Taken</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <Row
                  key={index}
                  isOdd={index % 2 !== 0}
                  raw={item.raw}
                  cChar={item.correctChar}
                  iChar={item.errorChar}
                  wpm={item.wpm}
                  accuracy={item.accuracy}
                  time={item.time}
                  taken={item.taken}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StatsPage;
