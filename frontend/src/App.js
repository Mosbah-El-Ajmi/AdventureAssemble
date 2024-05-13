import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import HomePage from "./components/HomePage.js";
import CreerMissionPage from "./components/CreerMissionPage.js";
import SuiviMission from "./components/SuiviMissions.js";
import Dashboard from "./components/Dashboard.js";
import HeaderLoggedIn from "./components/HeaderLoggedIn.js";
import LoginSigninPage from "./components/LoginSigninPage";
import Progression from "./components/Progression.js";
import Classement from "./components/Classement.js";
import AuthProvider from "./components/auth.js";
import PrivateRoute from "./components/PrivateRoute.js";

function App() {
  return (
    <div>
      <Header />
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login-or-sign-in" element={<LoginSigninPage />} />
            <Route path="/creer-mission" element={<CreerMissionPage />} />
            <Route path="/liste-missions" element={<SuiviMission />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/progression/*" element={<Progression />} />
            <Route path="/classement/*" element={<Classement />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
