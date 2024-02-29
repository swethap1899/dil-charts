import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import { Bar, getElementAtEvent } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./barchart.scss";

function BarChart({ title, data, labels }) {
  const chartRef = useRef();
  const options = {
    indexAxis: "y",
    maintainAspectRation: false,
    elements: {
      bar: { borderWidth: 2 },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataSet = {
    labels: [...(labels || [])],
    datasets: [
      {
        data: [...(data || [])],
        borderWidth: 1,
        categoryPercentage: 0.9,
        backgroundColor: "#DE046D77",
        borderColor: "#DE046D77",
      },
    ],
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  return (
    <div className="barchart-body background-box">
      {title}
      <Bar ref={chartRef} data={dataSet} options={options} height="200px" />
    </div>
  );
}

export default BarChart;
