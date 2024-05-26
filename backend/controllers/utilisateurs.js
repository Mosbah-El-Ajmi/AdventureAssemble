const express = require('express');
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const {auth, auth_id} = require('./auth_back.js');
const connection = require('../DbConnection');
const { createHash } = require('crypto');

const jwtSecret = '84dc00ddcda839cb7012d17f976461d78f0528ff501df769275c174cba8ffbeea10121e8b40d7e05';
const salt = '01de589d953d51d2425c47';

const generateAccessToken = (id_util) => {
    return jwt.sign({id_util}, jwtSecret, { expiresIn: 60*60 });
};

async function hash (password) {
    return createHash('sha512').update(password+salt).digest('hex');
};

exports.getAllUtilisateurs = (req, res) => {
    const query = 'SELECT id_compte, nom, prenom, mail, mot_de_passe FROM Utilisateur';
    const tok = req.params.tok;
    if(auth(tok)){
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
            } else {
                res.json(results);
            }
        });
    }
    else{
        res.status(500).json({ error: 'Mauvais token'});
    }
};

// Créer un nouvel utilisateur dans la table Utilisateurs de la db.
exports.postUtilisateurs = (req, res) => {
    // Récupération des valeurs depuis le corps de la requête
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const mot_de_passe = req.body.mot_de_passe;
    const sql = "INSERT INTO Utilisateur (nom, prenom, mail, mot_de_passe) VALUES (?,?,?,?)";
    
    hash(mot_de_passe).then(hashed =>
        connection.query(sql, [nom, prenom, mail, hashed], (err, result) => {
            if (err) {
                console.error('Erreur lors de la création d\'un nouvel utilisateur :', err);
                res.status(500).json({ error: 'Erreur lors de la création d\'un nouvel utilisateur' });
            } else {
                res.json(result);
            }
        })
    );
};

//renvoie token d'authentification
exports.getToken = (req, res) => {
    const name = req.params.name;
    const surname = req.params.surname;
    const password = req.params.password;
    const query = 'SELECT id_compte, nom FROM Utilisateur WHERE (nom, prenom, mot_de_passe) = (?,?,?)';
    hash(password).then(hashed =>
        connection.query(query, [name, surname, hashed], (err, result) => {
            result=JSON.parse(JSON.stringify(result))
            if (err) {
                console.error('Erreur lors de la vérification du login :', err);
                res.status(500).json({ error: 'Erreur lors de la vérification du login' });
            } else if (result[0] !== undefined) {
                res.json({token:generateAccessToken(result[0].id_compte), nom:result[0].nom, prenom:result[0].prenom, id:result[0].id_compte});
                
            } else {
                res.status(500).json({error:'Mauvais nom ou mot de passe'});
                console.error('Mauvais nom ou mot de passe');
            }
        })
    );
};
