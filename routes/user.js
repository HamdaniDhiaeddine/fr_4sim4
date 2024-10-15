import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

import { createUser, getUsers, getUserById, login, incrementUserDiscount } from '../controllers/userController.js';

const router = express.Router();

//login
router.post('/login', login);

// Create a new user
router.post('/create', createUser);

// Get all users
router.get('/list', authMiddleware,  getUsers);

// Get a specific user by ID
router.get('/:id', authMiddleware,  getUserById);

// Increment user discount
router.put('/discount/:userId', authMiddleware,  incrementUserDiscount);






export default router;
