import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.js";
import HomePage from "./components/HomePage.js";
import CreerMissionPage from "./components/CreerMissionPage.js";
import SuiviMission from "./components/SuiviMissions.js";
import Dashboard from "./components/Dashboard.js";
import HeaderLoggedIn from "./components/HeaderLoggedIn.js";
import LoginSigninPage from "./components/LoginSigninPage";
import Classement from "./components/Classement.js";
import AuthProvider from "./components/auth.js";
import ValiderMissions from "./components/ValiderMissions";

function App() {
    const location = useLocation();
    const headerRoutes = ["/creer-mission", "/liste-missions", "/dashboard", "/classement"];
    const shouldShowLoggedInHeader = headerRoutes.some(route => location.pathname.startsWith(route));

    return (
        <div>
            {shouldShowLoggedInHeader ? <HeaderLoggedIn /> : <Header />}
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/login-or-sign-in" element={<LoginSigninPage />} />
                    <Route path="/creer-mission" element={<CreerMissionPage />} />
                    <Route path="/liste-missions" element={<SuiviMission />} />
                    <Route path="/validation" element={<ValiderMissions />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/classement/*" element={<Classement />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;

