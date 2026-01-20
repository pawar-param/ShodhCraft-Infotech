const User = require("../models/User");

// POST /api/auth/signup
const signupUser = async (req, res) => {
  const { name, mobile, email, password } = req.body;

  if (!name || !mobile || !email || !password) {
    return res.status(400).json({
      message: "Please provide name, mobile, email, and password",
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const role =
      email === "admin@gmail.com" && password === "pass@123"
        ? "admin"
        : "user";

    const newUser = new User({
      name,
      mobile,
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};


// POST /api/auth/login
const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userData = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: userData
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

module.exports = { loginUser };

