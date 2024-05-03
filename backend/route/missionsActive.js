const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllMissionsActives, getMissionsActivesByJoueur, getMissionsActivesByStatus, getMissions24hByJoueur} = require('../controllers/missionsActive')

router.get('/', getAllMissionsActives);
router.get('/joueur/:id', getMissionsActivesByJoueur);
router.get('/status/:id', getMissionsActivesByStatus);
router.get('/24h/:id', getMissions24hByJoueur);


module.exports = router;
