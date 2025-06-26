const express = require('express');
const { createJob, getJobs, updateJob,deleteJob } = require('../controller/jobController');
const { protect } = require('../middleware/authMiddleWare'); // Import the authentication middleware
const upload = require('../middleware/uploadMiddleWare'); // Import the upload middleware
const router = express.Router();

router.get('/', protect, getJobs); // Route to get all jobs
// Route to create a new job
router.post('/', protect, upload.single('resume'),createJob);

router.put('/:id',protect, updateJob);

router.delete('/:id',protect, deleteJob);



module.exports = router;