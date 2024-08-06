import React from "react";
import { Line } from "react-chartjs-2";

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

const DefaultLineGraph = () => {
  const mapingData = {
    labels: [0, 1],
    datasets: [
      {
        labels: "Words Per Minute",
        data: [],
        borderColor: "rgb(66, 176, 255)",
        fill: true,
        pointStyle: "circle",
        tension: 0.8,
        yAxisID: "y1",
        pointRadius: 3,
      },
      {
        label: "Incorrect Words",
        data: [],
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
    plugins: {
      title: {
        display: true,
        text: ["Complete a Test to see", "your WPM history"],
        color: "#A0A0A0",
        font: {
          size: 14,
        },
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Word Number",
          color: "#A0A0A0",
        },
        grid: {
          display: true,
          color: "#444444",
        },
        border: {
          color: "#444444",
        },
      },
      y1: {
        id: "y1",
        position: "left",
        title: {
          display: true,
          text: "Words Per Minute",
          color: "#A0A0A0",
        },
        grid: {
          display: false,
          color: "#444444",
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
          color: "#A0A0A0",
        },
        grid: {
          display: false,
          color: "#444444",
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

export default DefaultLineGraph;
