const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllJoueurs, getJoueursById, getJoueursByIdUtilisateur, getJoueursByIdPartie} = require('../controllers/joueurs')

router.get('/:tok', getAllJoueurs);
router.get('/id/:id/:tok', getJoueursById);
router.get('/utilisateur/:id/:tok', getJoueursByIdUtilisateur);
router.get('/partie/:id/:tok', getJoueursByIdPartie);



module.exports = router;
