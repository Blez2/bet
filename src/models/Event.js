const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed'],
    default: 'upcoming'
  },
  odds: {
    type: Map,
    of: Number,
    required: true
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;