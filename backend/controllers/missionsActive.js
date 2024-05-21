const express = require('express');
const mysql = require("mysql");
const {auth, auth_id} = require('./auth_back.js');

const connection = require('../DbConnection');
/*
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
*/
//recupére les missions d'un joueur avec son id
exports.getMissionsActivesByJoueur = (req, res) => {
    const id = req.params.id
    const tok = req.params.tok;
    const query = 'SELECT id_mission_active, id_joueur, id_mission, date_debut, date_fin, id_status FROM MissionsActives WHERE id_joueur = ?';
    if(auth(tok)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des missions avec l id du joueur :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des missions active avec l id du joueur' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

//recupére les missions d'un joueur et leur nom avec son id
exports.getMissionsActivesNomsByJoueur = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_mission_active, id_joueur, Missions.id_mission, date_debut, date_fin, id_status, nom_mission FROM MissionsActives JOIN Missions WHERE id_joueur = ? AND Missions.id_mission = MissionsActives.id_mission';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des missions avec l id du joueur :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des missions active avec l id du joueur' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};


exports.getMissionsActivesByStatus = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_mission_active, id_joueur, id_mission, date_debut, date_fin, id_status FROM MissionsActives WHERE id_status = ?';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des missions avec leurs status:', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des missions active avec leurs status' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

// missions finies dans les dernières 24H d'un joueur avec son id
exports.getMissions24hByJoueur = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_mission_active, MissionsActives.id_mission, date_fin, points FROM MissionsActives JOIN Missions WHERE id_joueur = ? AND date_fin >= DATE_ADD(CURDATE(), INTERVAL -1 DAY) AND id_status = 1 AND Missions.id_mission = MissionsActives.id_mission';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des missions avec l id du joueur :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des missions active avec l id du joueur' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

exports.updateStatutV = (req, res) => {
    const statusMissions = 2;
    const idMissions = req.params.id;

    const sql = "UPDATE MissionsActives SET id_status = (?) WHERE id_mission_active = (?)";
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(sql, [statusMissions, idMissions], (err, result) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la description de la mission :', err);
                res.status(500).json({ error: 'Erreur lors de la mise à jour de la description de la mission' });
            } else {
                res.json(result);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};


exports.updateStatutL = (req, res) => {
    const statusMissions = 4;
    const idMissions = req.params.id;

    const sql = "UPDATE MissionsActives SET id_status = (?) WHERE id_mission_active = (?)";
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(sql, [statusMissions, idMissions], (err, result) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la description de la mission :', err);
                res.status(500).json({ error: 'Erreur lors de la mise à jour de la description de la mission' });
            } else {
                res.json(result);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

exports.getAllMissionsActives = (req, res) => {
    const query = `
        SELECT ma.id_mission_active, ma.id_joueur, ma.id_mission, ma.date_debut, ma.date_fin, ma.id_status, ma.photo_url, m.description_mission AS description_mission, m.nom_mission AS nom_mission, m.validation_photo AS validation_photo
        FROM MissionsActives ma
        JOIN Missions m ON ma.id_mission = m.id_mission
    `;
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des missions actives avec description:', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des missions actives avec description' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

exports.updatePhoto = (req, res) => {
    const urlPhoto = req.body.url;
    const idMissions = req.params.id;

    const sql = "UPDATE MissionsActives SET photo_url = (?) WHERE id_mission_active = (?)";
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(sql, [urlPhoto, idMissions], (err, result) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de l\'url de la photo :', err);
                res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'url de la photo' });
            } else {
                res.json(result);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};
