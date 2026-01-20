// controllers/jobController.js
const Job = require('../models/AdminJob');

// See available jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching jobs' });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const job = new Job({ title, description, location });
    await job.save();

    res.status(201).json({ success: true, message: 'Job posted successfully', job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error creating job' });
  }
};
