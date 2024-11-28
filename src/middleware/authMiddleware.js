// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token from HTTP-only cookie
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
      throw new Error('Authentication token missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('User not found');
    }

    // Attach user to request for future use
    req.user = user;
    next(); // Pass control to the next middleware/handler
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
