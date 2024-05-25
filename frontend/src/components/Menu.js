import React from "react";
import "../css/Menu.css";
import { Link, useLocation } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import {
  GiTimeBomb,
  GiAbstract038,
  GiHistogram,
} from "react-icons/gi";

function Menu() {
  const location = useLocation();
  const activeItem = location.pathname;

  // Vérifier la présence de "joueur_id" dans le localStorage
  const joueurId = localStorage.getItem("joueur_id");

  // Si "joueur_id" n'est pas présent, ne pas afficher le menu
  if (!joueurId) {
    return null;
  }
    
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
        <li className={activeItem === "/history" ? "active" : ""}>
          <Link to="/history">
            <GiTimeBomb />
            <span className="linkName">Historique</span>
          </Link>
        </li>
        
      </ul>
    </menu>
  );
}

export default Menu;

