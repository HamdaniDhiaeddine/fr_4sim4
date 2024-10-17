import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Handles JSON payloads
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded payloads

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Connect to MongoDB
connect('mongodb://localhost:27017/frApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0: ${PORT}`);
});
