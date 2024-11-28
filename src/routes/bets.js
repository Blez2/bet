// src/routes/bets.js

const express = require('express');
const BetEvent = require('../models/BetEvent');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get bets of the logged-in user (Protected Route)
router.get('/me', auth, async (req, res) => {
  try {
    const bets = await BetEvent.find({ 'bets.user': req.user._id }).select('topic bets');
    res.send(bets);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Failed to fetch bets' });
  }
});

module.exports = router;
