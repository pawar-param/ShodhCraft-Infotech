const ContactQuery = require('../models/ContactQuery');

// Submit a contact query
const submitContactQuery = async (req, res) => {
  try {
    const { fullName, email, company, phone, subject, message } = req.body;

    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    const newQuery = new ContactQuery({
      fullName: fullName?.trim(),
      email: email?.trim().toLowerCase(),
      company: company?.trim() || "",
      phone: phone?.trim(),
      subject: subject?.trim(),
      message: message?.trim()
    });

    await newQuery.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      queryId: newQuery._id
    });
  } catch (error) {
    console.error('❌ Contact form submission error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: validationErrors[0]
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};


// Get all contact queries
const getAllContactQueries = async (req, res) => {
  try {
    // Fetch all contact queries, sorted by newest first
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    // Send success response with all queries
    res.status(200).json({
      success: true,
      queries
    });
  } catch (error) {
    console.error('❌ Failed to fetch contact queries:', error);

    // Error handling response
    res.status(500).json({
      success: false,
      message: 'Unable to fetch messages. Please try again later.'
    });
  }
};


module.exports = {
  submitContactQuery,
  getAllContactQueries
};
