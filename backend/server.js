const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001; // ou tout autre port de votre choix
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ephec123@',
    database: 'dev3'
});

// Établir la connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
        return;
    }
    console.log('Connexion à la base de données MySQL réussie');
});

const utilisateursRouter = require('./route/utilisateurs');

app.use('/utilisateurs', utilisateursRouter);


app.listen(port, () => {
    console.log(`Serveur backend écoutant sur le port ${port}`);
});