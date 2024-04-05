import React, { useEffect } from "react";
import logo from "../images/Gather.png";
import accountIcon from "../images/account.png";
import "../css/Header.css";

function Header() {
  useEffect(() => {
    const account = document.getElementById("account-icon");
    const menuContainer = document.getElementById("menuContainerNotConnected");

    account.addEventListener("mouseenter", () => {
      menuContainer.style.transform = "translatex(0px)";
    });
    menuContainer.addEventListener("mouseleave", () => {
      menuContainer.style.transform = "translateX(120%)";
      document.body.style.overflow = "hidden";
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
            <a href="/">Accueil</a>
          </li>
        </ul>
        <div className="account-icon" id="account-icon">
          <a target="_blank" href="login-or-sign-in">
            <img src={accountIcon} alt="Account" />
          </a>
        </div>
        <div
          className="menuContainer not-connected"
          id="menuContainerNotConnected"
        >
          <ul>
            <li>
              <a target="_blank" href="login-or-sign-in">
                <span>Se Connecter</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
