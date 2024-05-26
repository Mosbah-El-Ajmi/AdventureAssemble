const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const {
  getAllJoueurs,
  getJoueursById,
  getJoueursByIdUtilisateur,
  getJoueursByIdPartie,
  updatePoints,
} = require("../controllers/joueurs");

router.get("/:tok", getAllJoueurs);
router.get("/id/:id/:tok", getJoueursById);
router.get("/utilisateur/:id/:tok", getJoueursByIdUtilisateur);
router.get("/partie/:id/:tok", getJoueursByIdPartie);
router.put("/score/:points/:id/:tok", updatePoints);

module.exports = router;
