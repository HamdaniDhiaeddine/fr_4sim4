// utils/jwt.js
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Change this to a secure key and store it safely

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
