const express = require('express');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ephec123@',
    database: 'dev3'
});

// Fonction pour récupérer toutes les missions active
exports.getAllMissionsActives = (req, res) => {
    const query = 'SELECT id_mission_active, id_joueur, id_mission, date_debut, date_fin, id_status FROM MissionsActives';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des missions active :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des missions active' });
        } else {
            res.json(results);
        }
    });
};

//recupére les missions d'un joueurs avec son id
exports.getMissionsActivesByJoueur = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_mission_active, id_joueur, id_mission, date_debut, date_fin, id_status FROM MissionsActives WHERE id_joueur = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des missions avec l id du joueur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des missions active avec l id du joueur' });
        } else {
            res.json(results);
        }
    });
};


exports.getMissionsActivesByStatus = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_mission_active, id_joueur, id_mission, date_debut, date_fin, id_status FROM MissionsActives WHERE id_status = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des missions avec leurs status:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des missions active avec leurs status' });
        } else {
            res.json(results);
        }
    });
};