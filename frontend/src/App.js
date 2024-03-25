import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from './HomePage.js';
import CreerMissionPage from './CreerMissionPage.js';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/creer-mission" element={<CreerMissionPage />} />
            </Routes>
        </div>
    );
}

export default App;

