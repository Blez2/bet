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
    console.error('Error fetching bet events:', error);
    res.status(500).send({ error: error.message || 'Failed to fetch bet events' });
  }
});

// Place a bet on a bet event
router.post('/:eventId/bets', auth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { option, amount } = req.body;

    if (!option || !amount || amount <= 0) {
      return res.status(400).send({ error: 'Valid option and amount are required.' });
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

    // Add the bet to the event
    const bet = {
      user: req.user._id,
      amount,
      odds: betEvent.odds.get(option),
      option,
      timestamp: new Date(), // Add timestamp to the bet
    };

    betEvent.bets.push(bet);
    await betEvent.save();

    res.status(201).send({ message: 'Bet placed successfully.', bet });
  } catch (error) {
    console.error('Error placing bet:', error);
    res.status(500).send({ error: error.message || 'Failed to place bet.' });
  }
});

// Delete all active bets
router.delete('/', auth, async (req, res) => {
  try {
    const result = await BetEvent.deleteMany({ status: 'open' });
    res.status(200).send({ message: 'All active bets deleted.', result });
  } catch (error) {
    console.error('Error deleting active bets:', error);
    res.status(500).send({ error: error.message || 'Failed to delete active bets.' });
  }
});

module.exports = router;
