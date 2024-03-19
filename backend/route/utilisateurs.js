const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ephec123@',
    database: 'dev3'
});

// Route pour récupérer les utilisateurs depuis la base de données
router.get('/', (req, res) => {
    const query = 'SELECT id_mission, nom_mission, description_mission FROM Missions';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
