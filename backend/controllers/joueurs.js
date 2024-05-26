const express = require('express');
const mysql = require("mysql");
const {auth, auth_id} = require('./auth_back.js');

const connection = require('../DbConnection');

// Fonction pour récupérer tous les joueurs
exports.getAllJoueurs = (req, res) => {
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des joueurs :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des des joueurs' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

//récupére d'un joueurs avec son id
exports.getJoueursById = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs WHERE id_joueur = ?';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des joueurs avec l id du joueur :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des joueurs avec l id du joueur' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

// récupére les joueur d'un utilisateur
exports.getJoueursByIdUtilisateur = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs WHERE id_utilisateur = ?';
    const tok = req.params.tok;
    if(auth_id(tok, id)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des joueurs avec l id de l utilisateur :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des joueurs avec l id utilisateur' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

//recup joueurs par id de la partie
exports.getJoueursByIdPartie = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs WHERE id_partie = ?';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des joueurs avec l id partie :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des joueurs avec l id partie' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

exports.updatePoints = (req, res) => {
    const points = req.params.points;
    const idJoueur = req.params.id;


    const sql = "UPDATE Joueurs SET nombre_points = nombre_points + (?) WHERE id_joueur = (?)";
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(sql, [points, idJoueur], (err, result) => {
            if (err) {
                console.error('Erreur lors de la mise à jour des points du joueur :', err);
                res.status(500).json({ error: 'Erreur lors de la mise à jour des points du joueur' });
            } else {
                res.json(result);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};