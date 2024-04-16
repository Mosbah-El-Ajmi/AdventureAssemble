const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllJoueurs, getJoueursById, getJoueursByIdUtilisateur, getJoueursByIdPartie} = require('../controllers/joueurs')

router.get('/', getAllJoueurs);
router.get('/id/:id', getJoueursById);
router.get('/utilisateur/:id', getJoueursByIdUtilisateur);
router.get('/partie/:id', getJoueursByIdPartie);
router.get('/auth/:name/:password', getToken);



module.exports = router;
