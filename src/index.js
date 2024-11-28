// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./cronJobs/generateBetEvents');

// Import backend routes
const authRoutes = require('./routes/authRoutes');
const betsRouter = require('./routes/bets');
const betEventsRouter = require('./routes/betEvents');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bets', betsRouter);
app.use('/api/bet-events', betEventsRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
