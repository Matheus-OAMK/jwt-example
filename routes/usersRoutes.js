const express = require('express');
const { openDb } = require('../db');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authorization.js');

const router = express.Router();


// just a test route to get all users if you are logged in
router.get('/', async (req, res) => {
  const pool = openDb();
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//This is the route to create a new user
router.post('/signup', async (req, res) => {
  const pool = openDb();
  console.log(req.body.password)
    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
      );
      const newUser = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [req.body.username, hashedPassword,]
      );
      res.json({ users: newUser.rows[0]});
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  });

module.exports = router;
