const express = require('express');
const { openDb } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtTokens} = require('../utils/jwtHelpers.js');

const router = express.Router();

router.post('/login', async(req,res) => {
  const pool = openDb();
  try {
    const {username, password} = req.body;
    // username check
    const users = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (users.rows.length === 0) 
      return res.status(400).json({error: 'User does not exist'});
    // password check
    const validPassword = await bcrypt.compare(password, users.rows[0].password);
    if (!validPassword) 
      return res.status(400).json({error: 'Invalid password'});
     //Jwt
     let tokens = jwtTokens(users.rows[0]);
     res.cookie('refresh_token', tokens.refresh_token, {httpOnly: true});
     res.json(tokens);
  } catch (error) {
    res.status(401).json({error: error.message});
  }
})



router.get('/refreshToken', (req,res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.status(401).json({error: 'null refresh token'});
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error,user) => {
      if (error) return res.status(403).json({error: error.message});
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refresh_token, {httpOnly: true});
      res.json(tokens);
    }) 
  } catch (error) {
    res.status(401).json({error: error.message});
  }
})


router.delete ('/refreshToken', (req,res) => {
  try {
    res.clearCookie('refresh_token')
    return res.status(200).json({message: 'refresh token deleted'})
  } catch (error) {
    res.status(401).json({error: error.message});
  }
})


module.exports = router;