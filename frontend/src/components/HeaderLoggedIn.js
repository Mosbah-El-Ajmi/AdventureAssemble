import React, { useEffect } from "react";
import logo from "../images/Gather.png";
import accountIcon from "../images/account.png";
import "../css/Header.css";

function HeaderLoggedIn() {
  useEffect(() => {
    const account = document.getElementById("account-icon");
    const menuContainer = document.getElementById("menuContainerConnected");

    account.addEventListener("mouseenter", () => {
      menuContainer.style.transform = "translatex(0px)";
    });
    menuContainer.addEventListener("mouseleave", () => {
      menuContainer.style.transform = "translatex(300px)";
    });
  }, []);

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li>
            <a href="accueil">Accueil</a>
          </li>
          <li>
            <a href="mission">Mission</a>
          </li>
          <li>
            <a href="classement">Classement</a>
          </li>
          <li>
            <a href="dashboard">Dashboard</a>
          </li>
          <li>
            <a href="creer-mission">Créer Mission</a>
          </li>
        </ul>
        <div className="account-icon">
          <a target="_blank" href="login-or-sign-in">
            <img src={accountIcon} alt="Account" />
          </a>
        </div>
        <div className="menuContainer connected" id="menuContainerConnected">
          <ul>
            <li>Compte</li>
            <li>Parametres</li>
            <li>Se Deconnecter</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderLoggedIn;
