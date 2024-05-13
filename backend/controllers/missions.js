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
    const id = req.body.id;
    const nom = req.body.nom;
    const description = req.body.description;
    const public = 1;
    const auteur = req.body.auteur;
    const destinataire = req.body.destinataire;
    const partie = req.body.partie;
    const point = req.body.point;


    const sql = "INSERT INTO Missions (id_mission, nom_mission, description_mission, public, auteur_id, destinataire_id, partie_id, points) VALUES (?,?,?,?,?,?,?,?)";
    connection.query(sql, [id, nom, description, public, auteur, destinataire, partie, point], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de la mission :', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion de la mission' });
        } else {
            res.json(result);
        }
    });
};


