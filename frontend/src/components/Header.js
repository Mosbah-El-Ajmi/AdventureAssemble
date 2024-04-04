import React from 'react';
import logo from './Gather.png'; 
import accountIcon from './account.png';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li><a href="/">Accueil</a></li>
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

export default Header;