const express = require('express');
const router = express.Router();
const DoctorRating = require('../models/DoctorRating');

// Get ratings for a specific doctor
router.get('/:doctorName', async (req, res) => {
  try {
    const ratings = await DoctorRating.find({ doctorName: req.params.doctorName });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctor ratings' });
  }
});

// Add a new rating
router.post('/', async (req, res) => {
  try {
    const rating = new DoctorRating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit doctor rating' });
  }
});

module.exports = router;
