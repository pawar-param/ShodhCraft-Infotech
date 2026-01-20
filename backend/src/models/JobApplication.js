const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "year is required"],
      enum: ["1", "2", "3", "4", "Passout"],
    },
    skills: {
      type: String,
      required: [true, "Skills are required"],
      trim: true,
      maxlength: [500, "Skills cannot exceed 500 characters"],
    },
    education: {
      type: String,
      required: [true, "Education is required"],
      trim: true,
      maxlength: [200, "Education cannot exceed 200 characters"],
    },
    currentLocation: {
      type: String,
      required: [true, "Current location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    availability: {
      type: String,
      required: [true, "Availability is required"],
      enum: ["immediate", "2weeks", "1month", "2months", "3months"],
    },
    jobId: {
      type: String,
      required: [true, "Job ID is required"],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: false,
      default: "",
    },
    resume: {
      type: String, // Base64 encoded string
      required: false,
      default: "",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications for same job by same email
jobApplicationSchema.index({ jobId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
