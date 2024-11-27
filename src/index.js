const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import backend routes
const authRouter = require('./routes/auth');
const authsRouter = require('./routes/auths');
const betsRouter = require('./routes/bets');

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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/auths', authsRouter);
app.use('/api/bets', betsRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
