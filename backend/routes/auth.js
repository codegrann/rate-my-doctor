const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);


// Sign-up Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // res.status(201).json({ message: 'User created successfully' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Sign-in Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ 
      token,
      email:user.email,
      userId:user._id
     });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Google Auth Route
router.post('/google', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
  console.log('Received token:', token); // Debugging


  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    console.log('Ticket payload:', ticket.getPayload()); // Debugging

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.findOne({ email, googleId: { $exists: false } });
      if (!user) {
        user = new User({ googleId, email, name, picture });
      } else {
        user.googleId = googleId; // Link existing email to Google account
      }
      await user.save();

    }

    const authToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ 
      token: authToken,
      email: user.email,
      userId: user._id
    });
  } catch (error) {
    console.log('Google auth error:', error);
    res.status(401).json({ message: error });
  }
});

module.exports = router;
