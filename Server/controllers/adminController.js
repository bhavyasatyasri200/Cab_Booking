const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminSchema');

const ALLOWED_ADMIN_EMAIL = 'karribhavyasatyasri@gmail.com';

// Admin Register
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || email.toLowerCase().trim() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ message: 'Access denied. Only admins can access.' });
    }

    const existing = await Admin.findOne({ email: ALLOWED_ADMIN_EMAIL });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email: ALLOWED_ADMIN_EMAIL, password: hashed });
    const token = jwt.sign({ id: admin._id, role: 'admin', email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || email.toLowerCase().trim() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ message: 'Access denied. Only admins can access.' });
    }

    const admin = await Admin.findOne({ email: ALLOWED_ADMIN_EMAIL });
    if (!admin) return res.status(404).json({ message: 'Admin account not found' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin', email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
