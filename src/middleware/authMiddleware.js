const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization required' });
    }
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user id (and optionally user record)
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token (user not found)' });
    req.user = { id: user.id, email: user.email, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
