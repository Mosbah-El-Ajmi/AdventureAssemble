import React from 'react';
import logo from './Gather.png'; 
import accountIcon from './account.png';
import './Header.css';

function HeaderLoggedIn() {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li><a href="accueil">Accueil</a></li>
          <li><a href="mission">Mission</a></li>
          <li><a href="classement">Classement</a></li>
          <li><a href="dashboard">Dashboard</a></li>
          <li><a href="creer-mission">Créer Mission</a></li>
        </ul>
		<div className="account-icon">
          <a target="_blank" href="login-or-sign-in">
            <img src={accountIcon} alt="Account" />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default HeaderLoggedIn;
