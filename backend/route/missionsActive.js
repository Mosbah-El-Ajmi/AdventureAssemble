const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllMissionsActives, getMissionsActivesByJoueur, getMissionsActivesByStatus} = require('../controllers/missionsActive')

router.get('/', getAllMissionsActives);
router.get('/joueur/:id', getMissionsActivesByJoueur);
router.get('/status/:id', getMissionsActivesByStatus);


module.exports = router;
