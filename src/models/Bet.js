// src/models/BetEvent.js

const mongoose = require('mongoose');

const betEventSchema = new mongoose.Schema({
  topic: String,
  options: [String], // Two artists
  blurb: String,
  odds: {
    type: Object, // Changed from Map to Object
    required: true,
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
