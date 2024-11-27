const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body); // Create a new user
    await user.save();

    // Generate JWT token for the user
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Registration failed' });
  }
});

// Login an existing user
router.post('/login', async (req, res) => {
  try {
    // Authenticate user with email and password
    const user = await User.findByCredentials(req.body.email, req.body.password);

    // Generate JWT token for the user
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Login failed' });
  }
});

// Retrieve logged-in user's profile (protected)
router.get('/me', auth, async (req, res) => {
  try {
    // The authenticated user is attached to req.user by the auth middleware
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to fetch user profile' });
  }
});

// Password Reset (Future feature)
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Logic to generate reset token (or send email link)
    res.send({ message: `Password reset link sent to ${email}` });
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to process request' });
  }
});

module.exports = router;
