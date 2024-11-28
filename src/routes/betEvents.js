// src/routes/betEvents.js

const express = require('express');
const BetEvent = require('../models/BetEvent');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get all open bet events
router.get('/', auth, async (req, res) => {
  try {
    const betEvents = await BetEvent.find({ status: 'open' });
    res.send(betEvents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Place a bet on a bet event
router.post('/:eventId/bets', auth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { option, amount } = req.body;

    if (!option || !amount) {
      return res.status(400).send({ error: 'Option and amount are required.' });
    }

    const betEvent = await BetEvent.findById(eventId);
    if (!betEvent) {
      return res.status(404).send({ error: 'Bet event not found.' });
    }

    if (betEvent.status !== 'open') {
      return res.status(400).send({ error: 'Bet event is not open for betting.' });
    }

    if (!betEvent.options.includes(option)) {
      return res.status(400).send({ error: 'Invalid betting option.' });
    }

    // Check user balance
    if (req.user.balance < amount) {
      return res.status(400).send({ error: 'Insufficient balance.' });
    }

    // Deduct amount from user balance
    req.user.balance -= amount;
    await req.user.save();

    // Create a new bet
    const Bet = require('../models/Bet');
    const bet = new Bet({
      user: req.user._id,
      amount,
      odds: betEvent.odds.get(option),
      event: betEvent._id,
      option,
    });

    await bet.save();

    res.status(201).send({ message: 'Bet placed successfully.', bet });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
