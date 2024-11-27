const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import backend routes
const authRouter = require('./routes/auth');
const authsRouter = require('./routes/auths');
const betsRouter = require('./routes/bets');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter); // General authentication routes
app.use('/api/auths', authsRouter); // User-related routes
app.use('/api/bets', betsRouter); // Betting-related routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
