const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password:  { type: String, required: true },
  confirmPassword: { type: String, required: true },
  role: { type: String, required: false },
  resetToken: { type: String },
  expireToken: { type: Date }
});

userSchema.index({email: 'text', firstName: 'text', lastName: 'text'});

module.exports = mongoose.model("users", userSchema);