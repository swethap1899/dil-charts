import React, { useState } from "react";
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
import ChartHeader from "../ChartHeader/ChartHeader";
import PopUpWindow from "../PopUpWindow/PopUpWindow";

function LineChart({ title, data, labels }) {
  const [popup, setPopup] = useState(false);
  const togglePopUp = () => {
    setPopup(!popup);
  };
  const options = {
    type: "line",
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        beginAtZero: false,
      },
      y: {
        stacked: false,
        border: { dash: [4, 5] },
        grid: {
          color: "#D0D0D0", // for the grid lines
          offset: false,
          drawTicks: false, // true is default
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
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
        borderCapStyle: "round",
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

  const ChartData = (
    <div className="linechart-body background-box">
      <ChartHeader title={title} popup={popup} togglePopUp={togglePopUp} />
      <Line data={dataSet} options={options} height="200px" />
    </div>
  );
  if (popup) return <PopUpWindow>{ChartData}</PopUpWindow>;
  else return ChartData;
}

export default LineChart;
