const express = require('express');
const router = express.Router();
const connection = require('../app');

router.get('/', (req, res) => {
    const query = 'SELECT nom FROM utilisateurs';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
