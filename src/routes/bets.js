// src/routes/bets.js

const express = require('express');
const Bet = require('../models/Bet');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new bet (Protected Route)
router.post('/', auth, async (req, res) => {
  try {
    const bet = new Bet({
      ...req.body,
      user: req.user._id
    });
    await bet.save();
    res.status(201).send(bet);
  } catch (error) {
    res.status(400).send({ error: error.message || 'Failed to place bet' });
  }
});

// Get bets of the logged-in user (Protected Route)
router.get('/me', auth, async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user._id }).populate('event');
    res.send(bets);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to fetch bets' });
  }
});

module.exports = router;
