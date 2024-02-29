import React from "react";
import "./popup-window.scss";

function PopUpWindow({ children }) {
  return (
    <div className="background-blur">
      <section className="pop-up">{children}</section>
    </div>
  );
}

export default PopUpWindow;
