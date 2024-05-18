const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllMissionsActives, getMissionsActivesByJoueur, getMissionsActivesNomsByJoueur, getMissionsActivesByStatus, getMissions24hByJoueur, updateStatutV, updatePhoto, updateStatutL} = require('../controllers/missionsActive')

router.get('/', getAllMissionsActives);
router.get('/joueur/:id', getMissionsActivesByJoueur);
router.get('/joueurNoms/:id', getMissionsActivesNomsByJoueur);
router.get('/status/:id', getMissionsActivesByStatus);
router.get('/24h/:id', getMissions24hByJoueur);
router.put('/validation/:id', updateStatutV);
router.put('/abandon/:id', updateStatutL)
router.put('/photo/:id', updatePhoto);

module.exports = router;
