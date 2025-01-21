const mongoose = require('mongoose');

const doctorRatingSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  hospitalName: { type: String, required: true },
  department: { type: String, required: true },
  specialty: { type: String, required: true },
  overallRating: { type: Number, required: true },
  wasAwesome: { type: Number, required: true }, // 1-5 scale
  gentleness: { type: Number, required: true }, // 1-5 scale
  wouldRecommend: { type: String, enum: ['Yes', 'No'], required: true },
  tags: [{ type: String }],
  comments: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DoctorRating', doctorRatingSchema);
