const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  odds: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost'],
    default: 'pending'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  }
}, {
  timestamps: true
});

const Bet = mongoose.model('Bet', betSchema);
module.exports = Bet;