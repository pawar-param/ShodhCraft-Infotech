const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express(); // ✅ must come first

// ✅ MIDDLEWARE FIRST
app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Connect DB after middleware
const connectDatabase = require("./src/config/database");
connectDatabase();

// ✅ Routes import
const authRoutes = require("./src/routes/authRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");
const contactRoutes = require("./src/routes/contactRoutes");

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use(limiter);

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", applicationRoutes);
app.use("/api", contactRoutes); // /api/contact

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(" Server error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // console.log(` Server running on http://localhost:${PORT}`);
});
