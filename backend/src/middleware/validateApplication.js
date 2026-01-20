
const validateApplicationData = (req, res, next) => {
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
    jobTitle
  } = req.body;

  // Check required fields
  const requiredFields = [
    'name', 'email', 'phone', 'year', 
    'skills', 'education', 'currentLocation', 'availability', 'jobId'
  ];
  
  const missingFields = requiredFields.filter(field => 
    !req.body[field] || req.body[field].toString().trim() === ''
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Please fill all required fields: ${missingFields.join(', ')}`
    });
  }

  // Validate email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  const validYear = ['1', '2', '3', '4', 'Passout'];
  if (!validYear.includes(year)) {
    return res.status(400).json({
      success: false,
      message: 'Please select a valid year '
    });
  }

  // Validate availability options
  const validAvailability = ['immediate', '2weeks', '1month', '2months', '3months'];
  if (!validAvailability.includes(availability)) {
    return res.status(400).json({
      success: false,
      message: 'Please select a valid availability option'
    });
  }

  next();
};

module.exports = validateApplicationData;