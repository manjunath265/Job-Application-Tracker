const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const JobRoutes = require('./routes/jobRoutes');
const AuthRoutes = require('./routes/authRoutes');


// Load environment variables from .env
dotenv.config();
//initialize express
const app = express();

app.use(express.json());      // Parse JSON request bodies
app.use(cors());              // Enable Cross-Origin Resource Sharing
app.use('/api/jobs', JobRoutes); // Use job routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory
app.use('/api/auth', AuthRoutes); // Use authentication routes


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
