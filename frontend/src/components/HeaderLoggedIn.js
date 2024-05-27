import React, { useEffect, useRef, useState } from "react";
import logo from "../images/Gather.png";
import accountIcon from "../images/account.png";
import "../css/Header.css";

function HeaderLoggedIn() {
  const [activeLink, setActiveLink] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const menuContainerRef = useRef(null);

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  const handleOutsideClick = (event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target)
    ) {
      setMenuVisible(false); // Hide menu if clicked outside of it
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
            <a
              href="liste-missions"
              className={activeLink === "liste-missions" ? "active" : ""}
              onClick={() => handleLinkClick("liste-missions")}
            >
              Suivi des missions
            </a>
          </li>
          <li>
            <a
              href="validation"
              className={activeLink === "validation" ? "active" : ""}
              onClick={() => handleLinkClick("validation")}
            >
              Valider missions
            </a>
          </li>
          <li>
            <a
              href="dashboard"
              className={activeLink === "dashboard" ? "active" : ""}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="creer-mission"
              className={activeLink === "creer-mission" ? "active" : ""}
              onClick={() => handleLinkClick("creer-mission")}
            >
              Créer Mission
            </a>
          </li>
          <li>
            <a
              href="choix-joueur"
              className={activeLink === "choix-joueur" ? "active" : ""}
            >
              Choisir Joueur
            </a>
          </li>
        </ul>
        <div className="account-icon" onClick={toggleMenu} id="account-icon">
          {" "}
          {/* Attach onClick event */}
          <img src={accountIcon} alt="Account" />
        </div>
        <div
          className={`menuContainer connected ${menuVisible ? "visible" : ""}`}
          ref={menuContainerRef}
        >
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
