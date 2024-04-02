import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from './js/HomePage.js';
import CreerMissionPage from './js/CreerMissionPage.js';
import ListeUtilisateurs from "./js/ListeUtilisateurs.js";
import Dashboard from './js/Dashboard.js';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/creer-mission" element={<CreerMissionPage />} />
                <Route path="/liste-user" element={<ListeUtilisateurs/>} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;

