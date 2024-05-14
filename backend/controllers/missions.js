const express = require('express');
const mysql = require("mysql");

const connection = require('../DbConnection');

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


exports.postMissions = (req, res) => {
    // Récupération des valeurs depuis le corps de la requête
    const nom = req.body.nom_mission;
    const description = req.body.description_mission;
    const datecrea = req.body.date_creation;
    const publique = req.body.public;
    const auteur = req.body.auteur_id;
    const destinataire = req.body.destinataire_id;
    const partie = req.body.partie_id;
    const point = req.body.points;
    const diff = req.body.difficulte;


    const sql = "INSERT INTO Missions (nom_mission, description_mission, date_creation, public, auteur_id, destinataire_id, partie_id, points, difficulte) VALUES (?,?,?,?,?,?,?,?,?)";
    connection.query(sql, [nom, description, datecrea, publique, auteur, destinataire, partie, point, diff], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de la mission :', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion de la mission' });
        } else {
            res.json(result);
        }
    });
};


