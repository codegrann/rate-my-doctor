const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google users
  googleId: { type: String, unique: true }, 
  name: { type: String }, 
  picture: { type: String }, 
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.password) return next();
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
