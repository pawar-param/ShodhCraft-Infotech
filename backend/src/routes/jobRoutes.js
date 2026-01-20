const express = require('express');
const router = express.Router();
const Job = require('../models/AdminJob');

// ✅ Create a job
router.post('/create', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to create job', error: err.message });
  }
});

// ✅ Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

// ✅ Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const result = await Job.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete job' });
  }
});

module.exports = router;
