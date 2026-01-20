const express = require("express");
const router = express.Router();
const {
  submitJobApplication,
  getAllApplications,
} = require("../controllers/applicationController");
const validateApplicationData = require("../middleware/validateApplication");

// POST /apply - Submit job application
router.post("/apply", validateApplicationData, submitJobApplication);

// GET /applications - Get all submitted applications
router.get("/applications", getAllApplications);

module.exports = router;
