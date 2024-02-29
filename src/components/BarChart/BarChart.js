import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import { Bar, getElementsAtEvent } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./barchart.scss";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import ChartHeader from "../ChartHeader/ChartHeader";
import { updateSelectedFilters } from "../../store/slices/dataSlice";
import { useDispatch } from "react-redux";

function BarChart({ title, data, labels, filterValues }) {
  const numBars = 7;
  const chartRef = useRef();
  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const togglePopUp = () => {
    setPopup(!popup);
  };

  const dataMod = popup ? data : data?.slice(0, numBars);
  const labelsMod = popup ? labels : labels?.slice(0, numBars);

  const onHover = (event, chartElement) => {
    const { native } = event;
    native.target.style.cursor = chartElement[0] ? "pointer" : "default";
  };
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
    onHover,
  };

  const getSelectedColor = () => {
    if (!Object.keys(filterValues).includes(title))
      return labels?.map(() => "#DE046D88");

    return labels?.map((ele) => {
      if (filterValues[title].includes(ele)) return "#DE046D88";
      return "#DE046D33";
    });
  };

  const dataSet = {
    labels: [...(labelsMod || [])],
    datasets: [
      {
        label: "Orders",
        data: [...(dataMod || [])],
        borderWidth: 0.9,
        categoryPercentage: 0.9,
        // barThickness: 35,
        minBarLength: 3,
        backgroundColor: getSelectedColor(),
        borderColor: getSelectedColor(),
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

  const onClick = (event) => {
    const clicked = getElementsAtEvent(chartRef.current, event);
    if (clicked.length > 0) {
      if (filterValues[title]?.includes(labels[clicked[0].index])) {
        const { [title]: remove, ...updatedFilters } = filterValues;

        if (remove.length > 1) {
          const i = remove.indexOf(labels[clicked[0].index]);
          const temp = remove.slice();
          temp.splice(i, 1);

          dispatch(
            updateSelectedFilters({ [title]: [...temp], ...updatedFilters })
          );
        } else dispatch(updateSelectedFilters({ ...updatedFilters }));
      } else if (!filterValues[title] || event.metaKey || event.ctrlKey)
        dispatch(
          updateSelectedFilters({
            ...filterValues,
            [title]: [...(filterValues[title] ?? ""), labels[clicked[0].index]],
          })
        );
      else
        dispatch(
          updateSelectedFilters({
            ...filterValues,
            [title]: [labels[clicked[0].index]],
          })
        );
    }
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const ChartData = (
    <div className="barchart-body background-box">
      <ChartHeader title={title} popup={popup} togglePopUp={togglePopUp} />
      <div
        className="chart-content"
        style={{ height: popup ? "80vh" : "fit-content", width: "80%" }}
      >
        <Bar
          plugins={[...dataPlugins]}
          ref={chartRef}
          data={dataSet}
          options={options}
          height={dataSet?.datasets[0].length > numBars ? "700" : "200"}
          onClick={(elements) => onClick(elements)}
        />
      </div>
    </div>
  );

  if (popup) return <PopUpWindow>{ChartData}</PopUpWindow>;
  else return ChartData;
}

export default BarChart;
