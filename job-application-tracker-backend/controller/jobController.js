const Job = require('../models/jobModel');

// @desc    Create a new job application
// @route   POST /api/jobs
// @access  Public (for now)
const createJob = async (req, res) => {
  try {
    const { company, position, platform, jobLink, appliedDate, status, notes} = req.body;

    const resumeFileName = req.file ? req.file.filename : null;
    const resumePath = req.file ? req.file.path : null;

    const newJob = new Job({
      company,
      position,
      platform,
      jobLink,
      appliedDate,
      status,
      notes,
      resumeFileName,
      resumePath,
        user: req.user.id // Assuming you have user information in req.user
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  }
   catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
}

// controllers/jobController.js


const getJobs = async (req, res) => {
  try {
    console.log("👤 Fetching jobs for user:", req.user.id);
    const jobs = await Job.find({ user: req.user.id }).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const Job = await Job.findById(req.params.id);

    if (!Job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // ✅ Use correct field name `user`, not `userId`
    if (Job.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });

  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = await Job.findById(req.params.id);

    if (!jobId) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // ✅ Correct field name
    if (jobId.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};
module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob
}