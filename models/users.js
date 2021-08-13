const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, unique: true, index: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  resetToken: { type: String },
  expireToken: { type: Date },
  confirmPassword: { type: String, required: true },
});

userSchema.index({ email: "text" });

module.exports = mongoose.model("users", userSchema);
