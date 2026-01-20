import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  CheckCircle,
  Send,
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // job ID
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobTitle = searchParams.get("title");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    skills: "",
    education: "",
    currentLocation: "",
    availability: "",
    resumeBase64: "",
    jobTitle,
  });
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        }),
      { threshold: 0.1 }
    );
    document
      .querySelectorAll("[data-animate]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    navigate("/career#openings");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Contact number is required";
    else if (formData.phone.replace(/\D/g, "").length !== 10)
      newErrors.phone = "Phone must be 10 digits";

    const allowedYears = ["1", "2", "3", "4", "Passout"];
    if (!formData.year) newErrors.year = "Year is required";
    else if (!allowedYears.includes(formData.year))
      newErrors.year = "Invalid year selected";

    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.currentLocation.trim())
      newErrors.currentLocation = "Location is required";
    if (!formData.availability)
      newErrors.availability = "Availability is required";
    if (!formData.resumeBase64) newErrors.resumeBase64 = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
        setTouched((prev) => ({ ...prev, [name]: true }));
      }
      return;
    }
    if (name === "skills" && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        resumeBase64: "Only PDF files are allowed",
      }));
      return;
    }
    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resumeBase64: "File size must be less than 1MB",
      }));
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, resumeBase64: reader.result }));
      setTouched((prev) => ({ ...prev, resumeBase64: true }));
      setErrors((prev) => ({ ...prev, resumeBase64: "" }));
    };
    reader.onerror = () => {
      setErrors((prev) => ({
        ...prev,
        resumeBase64: "Error reading file. Please try again.",
      }));
      setFileName("");
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFormData((prev) => ({ ...prev, resumeBase64: "" }));
    setFileName("");
    setErrors((prev) => ({ ...prev, resumeBase64: "" }));
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // Run validation
    // if (!validateForm()) {
    //   setSubmitMessage("Please fix the errors below");
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitMessage("");
    const payload = { ...formData, jobId: "JOB-001" };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Handle non-OK responses (like 400, 500, etc.)
      if (!response.ok) {
        if (response.status === 413) {
          setSubmitMessage(
            "File too large for server. Please use a smaller file."
          );
          return;
        }

        const errorData = await response.json();
        setSubmitMessage(
          errorData.message ||
            `Server error (${response.status}): Please try again.`
        );
        return;
      }

      // Parse JSON from backend
      const result = await response.json();

      if (result.success) {
        // ✅ Success case
        setSubmitMessage(
          "Application submitted successfully! We'll review your application and get back to you soon."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          year: "",
          skills: "",
          education: "",
          currentLocation: "",
          availability: "",
          resumeBase64: "",
          jobTitle,
        });
        setFileName("");
        setErrors({});
        setTouched({});
        // clearFile();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // ✅ Show backend-provided message (like "You already applied")
        setSubmitMessage(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Submit error:", error?.message);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setSubmitMessage(
          "Cannot connect to server. Please make sure the server is running on localhost:5000."
        );
      } else {
        setSubmitMessage(
          error.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    const filledFields = Object.entries(formData).filter(
      ([key, value]) => value !== ""
    ).length;
    return Math.round((filledFields / Object.keys(formData).length) * 100);
  };

  const inputFields = [
    {
      name: "name",
      label: "Full Name",
      icon: <User className="h-5 w-5" />,
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email Address",
      icon: <Mail className="h-5 w-5" />,
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Contact Number",
      icon: <Phone className="h-5 w-5" />,
      type: "tel",
      placeholder: "Enter contact number",
    },
    {
      name: "education",
      label: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      type: "text",
      placeholder: "e.g., B.Tech Computer Science",
    },
    {
      name: "currentLocation",
      label: "Current Location",
      icon: <MapPin className="h-5 w-5" />,
      type: "text",
      placeholder: "City, State",
    },
  ];

  const selectFields = [
    {
      name: "year",
      label: "Years of study",
      icon: <Briefcase className="h-5 w-5 cursor-pointer" />,
      options: [
        { value: "", label: "Select year of study" },
        { value: "1-0", label: "1st year" },
        { value: "2", label: "2nd year" },
        { value: "3", label: "3rd year" },
        { value: "4", label: "4th year" },
      ],
    },
    {
      name: "availability",
      label: "Availability",
      icon: <Calendar className="h-5 w-5" />,
      options: [
        { value: "", label: "Select availability" },
        { value: "immediate", label: "Immediate" },
        { value: "2weeks", label: "2 weeks notice" },
        { value: "1month", label: "1 month notice" },
        { value: "2months", label: "2 months notice" },
        { value: "3months", label: "3+ months notice" },
      ],
    },
  ];

  const progressPercentage = getProgressPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <section className="relative py-15 bg-gray-900 text-white overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 -right-16 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 -left-16 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className={`text-center md:text-left transform transition-all duration-1000 translate-y-0 opacity-100`}
            id="hero"
            data-animate
          >
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Build Your Career With</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                ShodhCraft Infotech
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl md:max-w-3xl lg:max-w-4xl mx-auto md:mx-0 text-gray-300 leading-relaxed font-light mb-12">
              Join our team to work on real IT projects, internships, college
              projects with source code, and professional training that bridges
              the gap between learning and industry-ready skills.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-16">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Connect With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <button
                onClick={handleClick}
                className="inline-flex items-center justify-center cursor-pointer border border-orange-500 text-orange-500 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                View Openings
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Optional Hero Illustration */}
          <div className="hidden md:block absolute right-0 bottom-0 w-1/2 lg:w-2/5">
            <img
              src="/assets/career-illustration.png"
              alt="Career at ShodhCraft Infotech"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-8 px-4 sm:px-6 transform transition-all duration-1000 mt-5 ${
            isVisible.header
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
          id="header"
          data-animate
        >
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span className="text-orange-500 text-3xl sm:text-4xl md:text-5xl">
              {jobTitle || "Job Position"} Application
            </span>
          </h1>
          {/* <p className="text-lg sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Join our team of skilled professionals and elevate your career with
            meaningful opportunities in a dynamic work environment.
          </p> */}
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div
            className={`p-6 mb-8 rounded-2xl ${
              submitMessage.includes("🎉")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {submitMessage.includes("🎉") ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center mr-2">
                  !
                </div>
              )}
              {submitMessage}
            </div>
          </div>
        )}

        {/* Form */}
        <div
          className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform transition-all duration-1000 ${
            isVisible.form
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
          id="form"
          data-animate
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Fields */}
            {inputFields.map((field, index) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {field.label} *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white ${
                      touched[field.name] && errors[field.name]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {field.name === "phone" && (
                  <p className="text-xs text-gray-500">
                    {formData.phone.length}/10 digits
                  </p>
                )}
                {touched[field.name] && errors[field.name] && (
                  <p className="text-red-500 text-sm flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-1 text-xs">
                      !
                    </div>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* Select Fields */}
            {selectFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {field.label} *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </div>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white ${
                      touched[field.name] && errors[field.name]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    disabled={isSubmitting}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {touched[field.name] && errors[field.name] && (
                  <p className="text-red-500 text-sm flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-1 text-xs">
                      !
                    </div>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Skills Textarea */}
          <div className="mt-6 space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Key Skills *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-4 text-gray-400">
                <Award className="h-5 w-5" />
              </div>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g., JavaScript, React, Node.js, Python..."
                rows={4}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none ${
                  touched.skills && errors.skills
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                }`}
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-gray-500">
              {formData.skills.length}/500 characters
            </p>
            {touched.skills && errors.skills && (
              <p className="text-red-500 text-sm flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-1 text-xs">
                  !
                </div>
                {errors.skills}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="mt-6 space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Upload Resume * (PDF only - Max 1MB)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className={`w-full p-4 border-2 border-dashed rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  touched.resumeBase64 && errors.resumeBase64
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none cursor-pointer">
                <div className="flex items-center text-gray-500 cursor-pointer">
                  <Upload className="h-5 w-5 mr-2 cursor-pointer" />
                  Click to upload
                </div>
              </div>
            </div>

            {formData.resumeBase64 && fileName && (
              <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center text-green-700 cursor-pointer">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {fileName}
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </div>
            )}

            {touched.resumeBase64 && errors.resumeBase64 && (
              <p className="text-red-500 text-sm flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-1 text-xs">
                  !
                </div>
                {errors.resumeBase64}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full cursor-pointer py-4 px-8 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Submitting Application...
                </>
              ) : (
                <>Submit Application</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
