const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    // Create a new user
    const user = new User(req.body);
    await user.save();

    // Generate a JWT token for the new user
    const token = await user.generateAuthToken();

    // Send the user and token as response
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Registration failed' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    // Authenticate user with email and password
    const user = await User.findByCredentials(req.body.email, req.body.password);

    // Generate a JWT token for the user
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Login failed' });
  }
});

// Get Logged-in User Info (Protected Route)
router.get('/me', auth, async (req, res) => {
  try {
    // Auth middleware attaches the authenticated user to req.user
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to fetch user info' });
  }
});

// Logout the current user (optional functionality)
router.post('/logout', auth, async (req, res) => {
  try {
    // Implement token invalidation logic here if needed
    res.send({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to logout' });
  }
});

module.exports = router;
