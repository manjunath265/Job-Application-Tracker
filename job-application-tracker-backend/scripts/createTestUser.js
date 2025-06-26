const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteOne({ email: 'test258@gmail.com' });

  const hashedPassword = await bcrypt.hash("258", 10);

  const user = await User.create({
    name: 'Test User',
    email: 'test258@gmail.com',
    password: hashedPassword,
  });

  console.log('✅ Test user created:', user.email);
  process.exit();
};

run();
