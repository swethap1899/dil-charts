import React, { useRef, useState } from "react";
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
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import ChartHeader from "../ChartHeader/ChartHeader";

function BarChart({ title, data, labels }) {
  const numBars = 7;
  const chartRef = useRef();

  const [popup, setPopup] = useState(false);
  const togglePopUp = () => {
    setPopup(!popup);
  };

  const dataMod = popup ? data : data?.slice(0, numBars);
  const labelsMod = popup ? labels : labels?.slice(0, numBars);

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
    labels: [...(labelsMod || [])],
    datasets: [
      {
        label: "Orders",
        data: [...(dataMod || [])],
        borderWidth: 0.9,
        categoryPercentage: 0.9,
        minBarLength: 3,
        backgroundColor: "#DE046D55",
        borderColor: "#DE046D55",
      },
    ],
  };

  const dataPlugins = [
    {
      afterDraw: (chart) => {
        const { ctx } = chart;

        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              if (!element.hidden) {
                const { y } = element.tooltipPosition();
                ctx.fillStyle = "#474747"; // Font color of the labels
                // ctx.font = `16px ${themeColors.fontFamilyLabels}`; // Font style and size
                ctx.textAlign = "start";
                ctx.textBaseline = "middle";
                const labelName = `${chart.data.labels[index]}`;

                ctx.fillText(labelName, 10, y); // Adjust the vertical position of the label (-20)
              }
            });
          }
        });
      },
    },
  ];

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const ChartData = (
    <div className="barchart-body background-box">
      <ChartHeader title={title} popup={popup} togglePopUp={togglePopUp} />
      <div
        className="chart-content"
        style={{ height: popup ? "100vh" : "fit-content", width: "80%" }}
      >
        <Bar
          plugins={[...dataPlugins]}
          ref={chartRef}
          data={dataSet}
          options={options}
          // height={dataSet?.datasets[0].length > 5 ? "700" : "200"}
        />
      </div>
    </div>
  );

  if (popup) return <PopUpWindow>{ChartData}</PopUpWindow>;
  else return ChartData;
}

export default BarChart;
