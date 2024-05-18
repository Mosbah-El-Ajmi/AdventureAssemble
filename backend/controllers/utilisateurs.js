const express = require('express');
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const connection = require('../DbConnection');

const jwtSecret = '84dc00ddcda839cb7012d17f976461d78f0528ff501df769275c174cba8ffbeea10121e8b40d7e05'

const generateAccessToken = (id_joueur) => {
  return jwt.sign({ id_joueur }, jwtSecret, { expiresIn: 60*60 });
};

exports.getAllUtilisateurs = (req, res) => {
    const query = 'SELECT id_compte, nom, prenom, mail, mot_de_passe FROM Utilisateur';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            res.json(results);
        }
    });
};

// Créer un nouvel utilisateur dans la table Utilisateurs de la db.
exports.postUtilisateurs = (req, res) => {
    // Récupération des valeurs depuis le corps de la requête
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const mot_de_passe = req.body.mot_de_passe;


    const sql = "INSERT INTO Utilisateur (nom, prenom, mail, mot_de_passe) VALUES (?,?,?,?)";
    connection.query(sql, [nom, prenom, mail, mot_de_passe], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création d\'un nouvel utilisateur :', err);
            res.status(500).json({ error: 'Erreur lors de la création d\'un nouvel utilisateur' });
        } else {
            res.json(result);
        }
    });
};

//renvoie token d'authentification
exports.getToken = (req, res) => {
    const name = req.params.name;
    const password = req.params.password;
    const query = 'SELECT id_compte, nom FROM Utilisateur WHERE (nom, mot_de_passe) = (?,?)';
    connection.query(query, [name, password], (err, result) => {
        result=JSON.parse(JSON.stringify(result))
        if (err) {
            console.error('Erreur lors de la vérification du login :', err);
            res.status(500).json({ error: 'Erreur lors de la vérification du login' });
        } else if (result[0] !== undefined) {
            res.json({token:generateAccessToken(result[0].id_compte), nom:result[0].nom, id:result[0].id_compte});
        } else {
            res.status(500).json({error:'Mauvais nom ou mot de passe'}); // changer code d'erreur ?
            console.error('Mauvais nom ou mot de passe');
        }
    });
};
