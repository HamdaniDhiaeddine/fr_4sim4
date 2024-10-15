import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createPost, getPosts, getPostById } from '../controllers/postController.js';


const router = express.Router();

// Create a new post with image upload
router.post('/create', authMiddleware, upload.single('image'), createPost);

// Get all posts
router.get('/list', authMiddleware, getPosts);

// Get a specific post by ID
router.get('/:id', authMiddleware, getPostById);

export default router;
