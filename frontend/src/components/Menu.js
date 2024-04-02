import React, { useEffect } from "react";
import "../css/Menu.css";
import { Link, useLocation } from 'react-router-dom';
import Logo from "../images/Gather.png"
import {
  GiMatterStates, 
  GiProgression, 
  GiGoldBar, 
  GiPodiumWinner, 
  GiSiren,
  GiBigGear,
  GiHamburgerMenu
} from 'react-icons/gi';


function Menu() {
  const location = useLocation();

  useEffect(() => {
    const  mainMenuLi = document
    .querySelectorAll("#mainMenu li, .lastMenu li");

    function changeActive() {
      mainMenuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));

    if (location.pathname === '/dashboard') {
      const podiumWinnerLink = document.querySelector("#mainMenu li:first-child");
      podiumWinnerLink.classList.add("active");
    }

  }, [location.pathname]);

  return (
    <menu>

      <ul id="mainMenu">
        <li><Link to="/dashboard"><GiPodiumWinner /></Link></li>
        <li><Link to="/progression"><GiProgression /></Link></li>
        <li><Link to="/rewards"><GiGoldBar /></Link></li>
        <li><Link to="/history"><GiMatterStates /></Link></li>
        <li><Link to="/notification"><GiSiren /></Link></li>
      </ul>

      <ul className="lastMenu">
        <li><Link to="/parameter"><GiBigGear /></Link></li>
        <li><Link to="/menu"><GiHamburgerMenu /></Link></li>
      </ul>
    </menu>
  );
}

export default Menu;