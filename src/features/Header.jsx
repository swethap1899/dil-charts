import React from "react";
import Logo from "../assets/icons/Logo.png";
import "./header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={Logo} alt="logo" />
      </div>
    </header>
  );
}

export default Header;
