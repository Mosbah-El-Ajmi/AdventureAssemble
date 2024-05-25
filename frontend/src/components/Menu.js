import React from "react";
import "../css/Menu.css";
import { Link, useLocation } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import {
  GiTimeBomb,
  GiAbstract038,
  GiProgression,
  GiGoldBar,
  GiSiren,
  GiBigGear,
  GiPeriscope,
  GiHistogram,
} from "react-icons/gi";

function Menu() {
  const location = useLocation();
  const activeItem = location.pathname;

  return (
    <menu>
      <ul id="mainMenu">
        <li className={activeItem === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <GiAbstract038 />
            <span className="linkName">Dashboard</span>
          </Link>
        </li>
        <li className={activeItem === "/classement" ? "active" : ""}>
          <Link to="/classement">
            <GiHistogram />
            <span className="linkName">Classement</span>
          </Link>
        </li>
        <li className={activeItem === "/liste-missions" ? "active" : ""}>
          <Link to="/liste-missions">
            <FaListCheck />
            <span className="linkName">Suivi des misssions</span>
          </Link>
        </li>
        <li className={activeItem === "/validation" ? "active" : ""}>
          <Link to="/validation">
            <GrValidate />
            <span className="linkName">Valider missions</span>
          </Link>
        </li>
        <li className={activeItem === "/rewards" ? "active" : ""}>
          <Link to="/rewards">
            <GiGoldBar />
            <span className="linkName">Récompense</span>
          </Link>
        </li>
        <li className={activeItem === "/history" ? "active" : ""}>
          <Link to="/history">
            <GiTimeBomb />
            <span className="linkName">Historique</span>
          </Link>
        </li>
        <li className={activeItem === "/notification" ? "active" : ""}>
          <Link to="/notification">
            <GiSiren />
            <span className="linkName">Notifications</span>
          </Link>
        </li>
        <li className={activeItem === "/parametre" ? "active" : ""}>
          <Link to="/parametre">
            <GiBigGear />
            <span className="linkName">Paramètres</span>
          </Link>
        </li>
        <li className={activeItem === "/filtres" ? "active" : ""}>
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
