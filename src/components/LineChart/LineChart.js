import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./linechart.scss";

function LineChart({ title, data, labels }) {
  const options = {
    type: "line",
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        label: {
          display: true,
        },
      },
      y: {
        stacked: false,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const dataSet = {
    labels: [...(labels || [])],
    datasets: [
      {
        label: "Revenue",
        data: [...(data || [])],
        borderWidth: 1,
        backgroundColor: "#DE046D77",
        borderColor: "#DE046D77",
        lineTension: 0.3,
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  return (
    <div className="linechart-body background-box">
      {title}
      <Line data={dataSet} options={options} height="200px" />
    </div>
  );
}

export default LineChart;
