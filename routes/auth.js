const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db/connect');
const User = require('../models/user');

const router = express.Router();

// 🔹 Register (local)
router.post('/register', async (req, res) => {
  const db = getDb();
  const users = new User(db);
  const { email, password } = req.body;

  const existing = await users.findByEmail(email);
  if (existing) return res.status(400).json({ error: 'User already exists' });

  await users.createUser(email, password);
  res.status(201).json({ message: 'User registered successfully' });
});

// 🔹 Login (local)
router.post('/login', async (req, res) => {
  const db = getDb();
  const users = new User(db);
  const { email, password } = req.body;

  const user = await users.findByEmail(email);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('jwt', token, { httpOnly: true, secure: false });
  res.status(200).json({ message: 'Login successful', token });
});

// 🔹 Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 🔹 Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('jwt', token, { httpOnly: true, secure: false });
    res.redirect('/api-docs');
  }
);

// 🔹 Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
