// middleware/auth.js
import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};



