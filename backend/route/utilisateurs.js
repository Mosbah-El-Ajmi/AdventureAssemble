const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllUtilisateurs,postUtilisateurs} = require('../controllers/utilisateurs')

router.get('/', getAllUtilisateurs);
router.post('/', postUtilisateurs);



module.exports = router;