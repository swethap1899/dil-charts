import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./donutchart.scss";

function DonutChart({ title, data, labels }) {
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
        backgroundColor: "#DE046D77",
        borderColor: "#DE046D77",
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
