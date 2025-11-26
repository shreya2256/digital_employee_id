require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

(async () => {
  try {
    await connectDB();
    const username = 'admin';
    const password = 'admin123'; // change this in production
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const admin = new Admin({ username, passwordHash });
    await admin.save();
    console.log('Admin created:', username, '/', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
