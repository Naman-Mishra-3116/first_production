import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { createToast } from "../../utils/createToast";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const LineGraph = ({ data, time, errorChar, correctChar, raw }) => {
  if (!data) {
    return null;
  }

  const isAuthticated = useSelector((state) => state.valid.isAuthticated);

  const token = useSelector((state) => state.valid.jwtToken);
;

  useEffect(() => {
    const submitTestDataForLoggedInUser = async function () {
      try {
        const { wpm, accuracy } = data[data.length - 1];

        const taken = new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        const response = await fetch("http://localhost:5000/test/submitTest", {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wpm,
            taken,
            accuracy,
            time,
            errorChar,
            correctChar,
            raw,
          }),
        });
        const { success, error } = await response.json();
        if (success) {
          return;
        } else if (error) {
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(
          "Error in sending test data to the frontend!",
          error.message
        );
      }
    };
    if (isAuthticated) {
      submitTestDataForLoggedInUser();
    } else {
      createToast("Login to Save your result!", "info");
    }
  }, [time, token, isAuthticated]);

  const wordPerMinuteData = data.map((item) => item.wpm);
  const wordNumber = data.map((item) => item.wordNumber);
  const incorrectWords = data.map((item) => item.iWords);
  wordNumber[wordNumber.length-1] = wordNumber[wordNumber.length-2]+1;
  

  const mapingData = {
    labels: wordNumber,
    datasets: [
      {
        labels: "Words Per Minute",
        data: wordPerMinuteData,
        borderColor: "rgb(66, 176, 255)",
        fill: true,
        pointStyle: "circle",
        tension: 0.8,
        yAxisID: "y1",
        pointRadius: 3,
      },
      {
        label: "Incorrect Words",
        data: incorrectWords,
        borderColor: "rgba(41,41,41)",
        fill: true,
        pointStyle: "circle",
        pointRadius: 3,
        tension: 0.8,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Word Number",
        },
        grid: {
          display: true,
          color: "#1f1f1f",
        },
      },
      y1: {
        id: "y1",
        position: "left",
        title: {
          display: true,
          text: "Words Per Minute",
        },
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 10,
        },
      },
      y2: {
        id: "y2",
        position: "right",
        title: {
          display: true,
          text: "Incorrect Words",
        },
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-[100%]">
      <Line options={options} data={mapingData} />
    </div>
  );
};

export default LineGraph;
