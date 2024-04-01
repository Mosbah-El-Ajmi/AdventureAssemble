const express = require('express');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ephec123@',
    database: 'dev3'
});

// Fonction pour récupérer toutes les missions
exports.getAllMissions = (req, res) => {
    const query = 'SELECT id_mission, nom_mission, description_mission FROM Missions';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des missions :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des missions' });
        } else {
            res.json(results);
        }
    });
};
