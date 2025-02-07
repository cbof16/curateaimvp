const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const signUp = async (name, email, password, walletAddress) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, walletAddress });
  await user.save();
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  return { user, token };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { signUp, login, verifyToken };
