import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from './HomePage.js';
import CreerMissionPage from './CreerMissionPage.js';
import ListeUtilisateurs from "./ListeUtilisateurs";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/creer-mission" element={<CreerMissionPage />} />
                <Route path="/liste-user" element={<ListeUtilisateurs/>} />
            </Routes>
        </div>
    );
}

export default App;

