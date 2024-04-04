const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const userController = require('../controllers/missions')

router.get('/', userController.getAllMissions);
router.post('/post/', userController.postMissions);





module.exports = router;
