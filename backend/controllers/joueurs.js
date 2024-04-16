const express = require('express');
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ephec123@',
    database: 'dev3'
});

const generateAccessToken = (id_joueur) => {
  return jwt.sign({ id_joueur }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

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

//renvoie token d'authentification
exports.getToken = (req, res) => {
    const name = req.params.name;
    const password = req.params.password;
    const query = 'SELECT id_compte FROM Utilisateur WHERE (nom, mot_de_passe) = (?,?)';
    connection.query(query, [name, mot_de_passe], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification du login :', err);
            res.status(500).json({ error: 'Erreur lors de la vérification du login' });
        } else if res.length === 1 {
            res.json({token:generateAccessToken(res[0].id_joueur)});
        } else {
            console.error('Mauvais nom ou mot de passe');
        }
    }
};

