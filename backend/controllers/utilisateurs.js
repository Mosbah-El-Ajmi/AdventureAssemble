const express = require('express');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ephec123@',
    database: 'dev3'
});

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