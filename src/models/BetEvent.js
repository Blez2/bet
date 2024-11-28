// src/models/BetEvent.js

const mongoose = require('mongoose');

const betEventSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

const BetEvent = mongoose.model('BetEvent', betEventSchema);
module.exports = BetEvent;
