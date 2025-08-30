const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(500).json({ error: "User and Password Required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = "INSERT INTO users (name, password_hash) VALUES (?, ?)";

    db.query(insertQuery, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database Error", details: err });
      }

      res.status(201).json({
        message: "User created successfully",
        user: { id: result.insertId, username, role: "user" },
      });
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Error hashing password" });
  }
});
