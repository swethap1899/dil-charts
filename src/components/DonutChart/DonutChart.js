import React, { useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut, getElementsAtEvent } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./donutchart.scss";
import ChartHeader from "../ChartHeader/ChartHeader";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import { updateSelectedFilters } from "../../store/slices/dataSlice";
import { useDispatch } from "react-redux";

function DonutChart({ title, data, labels, filterValues }) {
  const dispatch = useDispatch();
  const chartRef = useRef();

  const getSelectedColor = () => {
    const colors = ["#631d3f", "#e30b73"];

    if (!Object.keys(filterValues).includes(title))
      return ["#631d3f77", "#e30b7377"];

    return labels?.map((ele, i) => {
      if (filterValues[title].includes(ele)) return `${colors[i]}77`;
      return `${colors[i]}33`;
    });
  };

  const [popup, setPopup] = useState(false);
  const togglePopUp = () => {
    setPopup(!popup);
  };

  const onHover = (event, chartElement) => {
    const { native } = event;
    native.target.style.cursor = chartElement[0] ? "pointer" : "default";
  };

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
    onHover,
  };

  const dataSet = {
    labels: [...(labels || [])],
    datasets: [
      {
        label: title,
        data: [...(data || [])],
        borderWidth: 1,
        backgroundColor: getSelectedColor(),
        hoverBackgroundColor: getSelectedColor(),
        borderColor: "#FFF",
      },
    ],
  };

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

  ChartJS.register(ArcElement, Tooltip, Legend);
  const ChartData = (
    <div className="barchart-body background-box">
      <ChartHeader title={title} popup={popup} togglePopUp={togglePopUp} />

      <Doughnut
        data={dataSet}
        options={options}
        height="200px"
        ref={chartRef}
        onClick={(elements) => onClick(elements)}
      />
    </div>
  );

  if (popup) return <PopUpWindow>{ChartData}</PopUpWindow>;
  else return ChartData;
}

export default DonutChart;
