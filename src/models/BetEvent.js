// src/models/BetEvent.js

const mongoose = require('mongoose');

const betEventSchema = new mongoose.Schema(
  {
    topic: String,
    options: [String], // Two artists
    blurb: String,
    odds: {
      type: Map,
      of: Number, // e.g., { 'Artist A': 1.5, 'Artist B': 2.0 }
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    bets: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: Number,
        odds: Number,
        option: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BetEvent = mongoose.models.BetEvent || mongoose.model('BetEvent', betEventSchema);

module.exports = BetEvent;
