import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Importez BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter> {/* Encadrez votre application avec BrowserRouter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// Si vous souhaitez commencer à mesurer les performances de votre application,
// passez une fonction pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoyez-les à un point de terminaison d'analyse. En savoir plus : https://bit.ly/CRA-vitals
reportWebVitals();

