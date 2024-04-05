import React, { useEffect } from "react";
import "../css/Menu.css";
import { Link, useLocation } from "react-router-dom";
import {
  GiTimeBomb,
  GiAbstract038,
  GiProgression,
  GiGoldBar,
  GiSiren,
  GiBigGear,
  GiPeriscope,
} from "react-icons/gi";

function Menu() {
  const location = useLocation();

  useEffect(() => {
    const mainMenuLi = document.querySelectorAll("#mainMenu li");

    function changeActive() {
      mainMenuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));

    if (location.pathname === "/dashboard") {
      const choisi = document.querySelector("#mainMenu li:first-child");
      choisi.classList.add("active");
    }
  }, [location.pathname]);

  return (
    <menu>
      <ul id="mainMenu">
        <li>
          <Link to="/dashboard">
            <GiAbstract038 />
            <span className="linkName">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/progression">
            <GiProgression />
            <span className="linkName">Progression</span>
          </Link>
        </li>
        <li>
          <Link to="/rewards">
            <GiGoldBar />
            <span className="linkName">Récompense</span>
          </Link>
        </li>
        <li>
          <Link to="/history">
            <GiTimeBomb />
            <span className="linkName">Historique</span>
          </Link>
        </li>
        <li>
          <Link to="/notification">
            <GiSiren />
            <span className="linkName">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/parameter">
            <GiBigGear />
            <span className="linkName">Paramètres</span>
          </Link>
        </li>
        <li>
          <Link to="/filtres">
            <GiPeriscope />
            <span className="linkName">Filtres</span>
          </Link>
        </li>
      </ul>
    </menu>
  );
}

export default Menu;
