import React, { useEffect } from "react";
import { BiSearchAlt, BiBell, BiChevronDown } from "react-icons/bi";
import spike from "../images/spike.jpg";

function TopContainer() {
  return (
    <div className="topContainer">
      <div className="inputBox">
        <input type="text" placeholder="Rechercher" />
        <i>
          <BiSearchAlt />
        </i>
      </div>

      <div className="profileContainer">
        <i className="profileIcon">
          <BiBell />
        </i>

        <div className="profileImage">
          <img src={spike} alt="" />
        </div>
        <p className="profileName">Alex Adams</p>
        <i className="menuChevron" id="menuChevron">
          <BiChevronDown />
        </i>
      </div>
    </div>
  );
}

export default TopContainer;
