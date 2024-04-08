const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {getAllMissions,postMissions} = require('../controllers/missions')

router.get('/', getAllMissions);
router.post('/', postMissions);





module.exports = router;
