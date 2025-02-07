const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  walletAddress: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  metadata: { type: Map, of: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
