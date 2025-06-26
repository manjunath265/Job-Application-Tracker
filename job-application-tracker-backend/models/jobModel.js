// models/JobModel.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: String,
  position: String,
  appliedDate: Date,
  platform: String,
  status: {
    type: String,
    default: "Applied"
  },
  notes: String,
  resumePath: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Job', JobSchema);