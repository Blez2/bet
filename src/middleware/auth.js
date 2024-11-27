const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
const auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('Authentication failed');
    }

    // Attach user to request for future use
    req.user = user;
    next(); // Pass control to the next middleware/handler
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
