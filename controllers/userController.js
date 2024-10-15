import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    // Destructure request body
    const { nom, cin, numTel, email, password } = req.body;

    // Validate input
    if (!nom || !cin || !numTel || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      nom,
      cin,
      numTel,
      email,
      password: hashedPassword, // Save the hashed password
      role: 'user', // Default role
    });

    // Save the user to the database
    await user.save();

    // Exclude password from the response
    const { password: _, ...userInfo } = user.toObject();
    res.status(201).json(userInfo); // Send the user info as response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate token
    const token = generateToken(user._id);
    
    res.json({ user, token }); // Send the token to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// logout
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logout successful' });
  });
};

// Increment user discount
export const incrementUserDiscount = async (req, res) => {
  try {
      const { userId } = req.params; // Get user ID from request parameters

      // Find the user and increment the discount
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $inc: { discount: 1 } }, // Increment discount by 1
          { new: true } // Return the updated user
      );

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};





