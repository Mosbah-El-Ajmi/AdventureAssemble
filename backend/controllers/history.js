const express = require("express");
const mysql = require("mysql");
const { auth, auth_id } = require("./auth_back.js");

const connection = require("../DbConnection");

// Function to get all player history
exports.getAllPlayerHistory = (req, res) => {
  const tok = req.params.tok;
  if (auth(tok)) {
    const query = "SELECT * FROM playerhistory";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching player history:", error);
        res.status(500).json({ error: "Error fetching player history" });
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
};

// Function to add player history
exports.postPlayerHistory = (req, res) => {
  const tok = req.params.tok;

  const { id_joueur, id_partie, points } = req.body;
  if (!id_joueur || !id_partie || !points) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (auth(tok)) {
    const sql =
      "INSERT INTO playerhistory (id_joueur, id_partie, points) VALUES (?, ?, ?)";
    connection.query(sql, [id_joueur, id_partie, points], (error, result) => {
      if (error) {
        console.error("Error adding player history:", error);
        res.status(500).json({ error: "Error adding player history" });
      } else {
        res.json({ message: "Player history added successfully" });
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
};
