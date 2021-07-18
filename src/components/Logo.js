//LOGO Component to display logo on home page
import React from "react";

import logo from "./Dyte-Logo.png";
function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="" />
    </div>
  );
}

export default Logo;
