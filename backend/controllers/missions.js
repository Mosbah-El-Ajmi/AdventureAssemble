const express = require('express');
const mysql = require("mysql");
const {auth, auth_id} = require('./auth_back.js');

const connection = require('../DbConnection');

// Fonction pour récupérer toutes les missions
exports.getAllMissions = (req, res) => {
    const tok = req.params.tok;
    const query = 'SELECT id_mission, nom_mission, description_mission FROM Missions';
    if(auth(tok)){
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des missions :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des missions' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
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
    const tok = req.params.tok;


    const sql = "INSERT INTO Missions (nom_mission, description_mission, date_creation, public, auteur_id, destinataire_id, partie_id, points, difficulte) VALUES (?,?,?,?,?,?,?,?,?)";
    if(auth(tok)){
        connection.query(sql, [nom, description, datecrea, publique, auteur, destinataire, partie, point, diff], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion de la mission :', err);
                res.status(500).json({ error: 'Erreur lors de l\'insertion de la mission' });
            } else {
                res.json(result);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};


