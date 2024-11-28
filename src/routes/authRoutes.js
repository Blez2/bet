// src/routes/authRoutes.js

const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, balance } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).send({ error: 'Username, email, and password are required.' });
    }

    const user = new User({ username, email, password, balance });
    await user.save();
    const token = await user.generateAuthToken();

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS
      sameSite: 'strict', // CSRF protection
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(201).send({ user });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).send({ error: 'Username or email already exists.' });
    } else if (error.name === 'ValidationError') {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required.' });
    }

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get Logged-in User Info
router.get('/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to fetch user info' });
  }
});

// User Logout
router.post('/logout', auth, async (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty value and expiring it immediately
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set expiration to past date
    });
    res.send({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to logout.' });
  }
});

module.exports = router;
