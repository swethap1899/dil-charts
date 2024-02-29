import React from "react";
import "./popup-window.scss";

function PopUpWindow({ children }) {
  return <section className="pop-up">{children}</section>;
}

export default PopUpWindow;
