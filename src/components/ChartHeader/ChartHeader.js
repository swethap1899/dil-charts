import React from "react";
import closeIcon from "../../assets/icons/close.svg";
import popupIcon from "../../assets/icons/popup.png";
import "./chart-header.scss";

function ChartHeader({ title, popup, togglePopUp }) {
  return (
    <div className="chart-header">
      {title}
      <button type="button" onClick={togglePopUp}>
        <img src={popup ? closeIcon : popupIcon} alt="pop-up" />
      </button>
    </div>
  );
}

export default ChartHeader;
