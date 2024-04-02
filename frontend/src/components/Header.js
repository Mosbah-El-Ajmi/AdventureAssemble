import React from 'react';
import logo from './Gather.png'; 
import accountIcon from './account.png';
import '../css/Header.css';

function Header() {
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
          <li id="dashboard"><a href="dashboard">Dashboard</a></li>
          <li><a href="creer-mission">Créer Mission</a></li>
        </ul>
		<div className="account-icon">
          <img src={accountIcon} alt="Account" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
