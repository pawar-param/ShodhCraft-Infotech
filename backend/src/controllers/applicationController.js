const JobApplication = require("../models/JobApplication");
const sendEmail = require("../utils/sendEmail");

// Submit job application
const submitJobApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      year,
      skills,
      education,
      currentLocation,
      availability,
      jobId,
      jobTitle,
      resumeBase64,
    } = req.body;

    // Check if user already applied for this job
    const existingApplication = await JobApplication.findOne({
      email: email.trim().toLowerCase(),
      jobId: jobId.trim(),
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job position",
      });
    }

    // Create new job application
    const newApplication = new JobApplication({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      year,
      skills: skills.trim(),
      education: education.trim(),
      currentLocation: currentLocation.trim(),
      availability,
      jobId: jobId.trim(),
      jobTitle: jobTitle.trim(),
      resume: resumeBase64 || null,
    });

    // Save to database
    await newApplication.save();

    // ✉️ Send confirmation email to the applicant
    await sendEmail({
      to: email.trim().toLowerCase(),
      subject: `Application Received - ${jobTitle}`,
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position (Job ID: ${jobId}).</p>
        <p>We have received your application and our team will review it shortly.</p>
        <p>We'll get back to you soon.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>ShodhCraft Infotech Team</strong></p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      applicationId: newApplication._id,
    });
  } catch (error) {
    console.error("❌ Application submission error:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job position",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Fetch all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("❌ Failed to fetch applications:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch applications. Please try again later.",
    });
  }
};

module.exports = {
  submitJobApplication,
  getAllApplications,
};
