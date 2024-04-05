import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import HomePage from "./components/HomePage.js";
import CreerMissionPage from "./components/CreerMissionPage.js";
import ListeUtilisateurs from "./components/ListeUtilisateurs.js";
import Dashboard from "./components/Dashboard.js";
import HeaderLoggedIn from "./components/HeaderLoggedIn.js";
import LoginSigninPage from "./components/LoginSigninPage";
import Progression from "./components/Progression.js";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/creer-mission" element={<CreerMissionPage />} />
        <Route path="/login-or-sign-in" element={<LoginSigninPage />} />
        <Route path="/liste-user" element={<ListeUtilisateurs />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/progression/*" element={<Progression />} />
      </Routes>
    </div>
  );
}

export default App;
