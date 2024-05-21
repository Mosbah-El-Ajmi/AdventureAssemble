const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const history = require("../controllers/history");

router.get("/:tok", history.getAllPlayerHistory);
router.post("/:tok", history.postPlayerHistory);

module.exports = router;
