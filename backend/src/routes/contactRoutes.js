const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {
  submitContactQuery,
  getAllContactQueries,
} = require("../controllers/contactController");

router.post("/contact", submitContactQuery);
router.get("/contact", getAllContactQueries);

module.exports = router;
