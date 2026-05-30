const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getDb } = require('../db/connect');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const db = getDb();
  const userModel = new User(db);
  const { email, password } = req.body;
  const existing = await userModel.findByEmail(email);
  if (existing) return res.status(400).json({ error: 'User already exists' });
  await userModel.createUser(email, password);
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const db = getDb();
  const userModel = new User(db);
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

router.get('/logout', (req, res) => {
  req.logout(() => res.json({ message: 'Logged out' }));
});

module.exports = router;
