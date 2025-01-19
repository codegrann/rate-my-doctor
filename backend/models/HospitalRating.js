const mongoose = require('mongoose');

const hospitalRatingSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  overallRating: { type: Number, required: true },
  facilities: { type: Number, required: true },
  location: { type: Number, required: true },
  safety: { type: Number, required: true },
  staff: { type: Number, required: true },
  cleanliness: { type: Number, required: true },
  comments: { type: String },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HospitalRating', hospitalRatingSchema);
