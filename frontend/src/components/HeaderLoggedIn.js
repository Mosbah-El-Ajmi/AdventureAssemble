import React, { useEffect } from "react";
import logo from "../images/Gather.png";
import accountIcon from "../images/account.png";
import "../css/Header.css";

function HeaderLoggedIn() {
  useEffect(() => {
    const account = document.getElementById("account-icon");
    const menuContainer = document.getElementById("menuContainerConnected");

    if (account && menuContainer) {
      account.addEventListener("mouseenter", handleMouseEnter);
      menuContainer.addEventListener("mouseleave", handleMouseLeave);

      // Nettoyage des écouteurs d'événements lorsque le composant est démonté
      return () => {
        account.removeEventListener("mouseenter", handleMouseEnter);
        menuContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  const handleMouseEnter = () => {
    const menuContainer = document.getElementById("menuContainerConnected");
    if (menuContainer) {
      menuContainer.style.transform = "translatex(0px)";
    }
  };

  const handleMouseLeave = () => {
    const menuContainer = document.getElementById("menuContainerConnected");
    if (menuContainer) {
      menuContainer.style.transform = "translatex(300px)";
    }
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li>
            <a href="liste-missions">Suivi des missions</a>
          </li>
          <li>
            <a href="validation">Valider missions</a>
          </li>
          <li>
            <a href="dashboard">Dashboard</a>
          </li>
          <li>
            <a href="creer-mission">Créer Mission</a>
          </li>
          <li>
            <a href="choix-joueur">Choisir Joueur</a>
          </li>
        </ul>
        <div className="account-icon" id="account-icon">
          <img src={accountIcon} alt="Account" />{" "}
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
