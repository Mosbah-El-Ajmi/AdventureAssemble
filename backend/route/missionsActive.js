const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllMissionsActives, getMissionsActivesByJoueur, getMissionsActivesByStatus, updateStatutV, updatePhoto, updateStatutL} = require('../controllers/missionsActive')

router.get('/', getAllMissionsActives);
router.get('/joueur/:id', getMissionsActivesByJoueur);
router.get('/status/:id', getMissionsActivesByStatus);
router.put('/validation/:id', updateStatutV);
router.put('/abandon/:id', updateStatutL)
router.put('/photo/:id', updatePhoto);


module.exports = router;
