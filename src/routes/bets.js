const express = require('express');
const Bet = require('../models/Bet');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const bet = new Bet({
      ...req.body,
      user: req.user._id
    });
    await bet.save();
    res.status(201).send(bet);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    await req.user.populate('bets');
    res.send(req.user.bets);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;