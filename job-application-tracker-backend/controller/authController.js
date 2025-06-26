// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // 🔥 Remove manual hashing
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error("🚨 Registration error:", err.message);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📨 Incoming login attempt:", { email });

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log("🚫 No user found for email:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log("🚫 Password mismatch for user:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error("🚨 Login error:", err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};