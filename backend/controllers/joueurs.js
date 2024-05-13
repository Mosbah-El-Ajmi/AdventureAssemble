const express = require('express');
const mysql = require("mysql");

const connection = require('../DbConnection');

// Fonction pour récupérer tous les joueurs
exports.getAllJoueurs = (req, res) => {
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des joueurs :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des des joueurs' });
        } else {
            res.json(results);
        }
    });
};

//récupére d'un joueurs avec son id
exports.getJoueursById = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs WHERE id_joueur = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des joueurs avec l id du joueur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des joueurs avec l id du joueur' });
        } else {
            res.json(results);
        }
    });
};

// récupére les joueur d'un utilisateur
exports.getJoueursByIdUtilisateur = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs WHERE id_utilisateur = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des joueurs avec l id de l utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des joueurs avec l id utilisateur' });
        } else {
            res.json(results);
        }
    });
};

//recup joueurs par id de la partie
exports.getJoueursByIdPartie = (req, res) => {
    const id = req.params.id
    const query = 'SELECT id_joueur, id_utilisateur, id_partie, pseudo, nombre_points FROM Joueurs WHERE id_partie = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des joueurs avec l id partie :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des joueurs avec l id partie' });
        } else {
            res.json(results);
        }
    });
};

