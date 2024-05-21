const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllUtilisateurs, postUtilisateurs, getToken} = require('../controllers/utilisateurs')

router.get('/:tok', getAllUtilisateurs);
router.post('/', postUtilisateurs);
router.get('/auth/:name/:password', getToken);



module.exports = router;
