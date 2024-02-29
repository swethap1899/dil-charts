import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./donutchart.scss";

function DonutChart({ title, data, labels }) {
  const themeColors = ["#631d3f77", "#e30b7377"];

  const options = {
    indexAxis: "y",
    maintainAspectRation: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
  };

  const dataSet = {
    labels: [...(labels || [])],
    datasets: [
      {
        label: title,
        data: [...(data || [])],
        borderWidth: 1,
        backgroundColor: themeColors,
        hoverBackgroundColor: themeColors,
        borderColor: "#FFF",
      },
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <div className="barchart-body background-box">
      {title}
      <Doughnut data={dataSet} options={options} height="200px" />
    </div>
  );
}

export default DonutChart;
