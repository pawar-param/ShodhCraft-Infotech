import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Building,
  Globe,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Twitter,
  ChevronRight,
  Facebook,
  Instagram,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const goToServices = () => {
    // Navigate to home and scroll to services
    navigate("/#services");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqdata = {
      fullName: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqdata),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Submission failed.");
      }
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      toast.error("Error submitting form. Try again later.");
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+91 9175534307",
      subtitle: "Mon-Fri 9AM-6PM",
      gradient: "from-blue-500 to-cyan-500",
      href: "tel:+919175534307",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "shodhcraft@gmail.com",
      subtitle: "24/7 Support",
      gradient: "from-purple-500 to-pink-500",
      href: "mailto:shodhcraft@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      content: "Pune, Maharashtra",
      subtitle: "India",
      gradient: "from-green-500 to-emerald-500",
      href: "#",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Mon - Fri: 9AM - 6PM",
      subtitle: "Sat: 9AM - 2PM",
      gradient: "from-orange-500 to-red-500",
      href: "#",
    },
  ];

  const services = [
    "Custom Software Development",
    "Web, Mobile & Cloud Solutions",
    "Freelancing & IT Consulting",
    "College Projects with Source Code",
    "Professional IT Training",
    "Internship Programs",
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/shodhcraft-infotech/",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/shodhcraft?igsh=MThpenRxdG9saHd0bw==",
      label: "Instagram",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 -right-16 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 -left-16 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className={`text-center md:text-left transform transition-all duration-1000 ${
              isVisible.hero
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="hero"
            data-animate
          >
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Get in Touch with</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                ShodhCraft Infotech
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl md:max-w-3xl lg:max-w-4xl mx-auto md:mx-0 text-gray-300 leading-relaxed font-light mb-12">
              Have a project idea or need IT solutions? Connect with ShodhCraft
              Infotech today — we provide IT services, freelancing solutions,
              college projects, and professional guidance to turn your ideas
              into reality.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-16">
              <a
                href="/contact-form"
                className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="/services"
                className="inline-flex items-center justify-center border border-orange-500 text-orange-500 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Our Services
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Optional Hero Illustration */}
          <div className="hidden md:block absolute right-0 bottom-0 w-1/2 lg:w-2/5">
            <img
              src="/assets/contact-illustration.png"
              alt="Contact Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.contactInfo
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="contactInfo"
            data-animate
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ready to start your digital journey? Reach out to us and our
                team will guide you through IT services, freelancing solutions,
                projects, and professional support.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className={`group block bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-md hover:shadow-2xl border border-gray-200/50 transform transition-all duration-500 hover:-translate-y-2 hover:bg-white/20 cursor-pointer ${
                    isVisible.contactInfo
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {info.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {info.title}
                  </h3>

                  {/* Content */}
                  <p className="text-gray-700 font-medium mb-1">
                    {info.content}
                  </p>
                  <p className="text-gray-500 text-sm">{info.subtitle}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Form */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible.form
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              id="form"
              data-animate
            >
              <div className="bg-white/90 rounded-3xl p-8 shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-700">
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 mb-6">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-gray-700 mb-8">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-500 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Company / Collage
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your requirements..."
                          rows="6"
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5 " />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible.info
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              id="info"
              data-animate
              style={{ transitionDelay: "300ms" }}
            >
              <div className="space-y-8">
                {/* Why Choose Us Card */}
                <div className="bg-gradient-to-br from-orange-200 to-orange-400 rounded-3xl p-8 text-gray-900 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Why Choose ShodhCraft?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "End-to-end IT solutions",
                      "10+ Technology Domains Covered",
                      "200+ Satisfied Clients",
                      "50+ Projects Successfully Delivered",
                      "5+ Years of Industry Experience",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Our Services
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-orange-50 to-orange-100 px-3 py-2 rounded-lg border border-orange-200"
                      >
                        <span className="text-orange-800 font-medium text-sm">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow hover:shadow-lg transition-transform duration-300 hover:scale-110"
                        title={social.label}
                      >
                        {/* Icon with brand color */}
                        {React.cloneElement(social.icon, {
                          className:
                            social.label === "LinkedIn"
                              ? "h-6 w-6 text-blue-600"
                              : social.label === "Instagram"
                              ? "h-6 w-6 text-pink-500" // You can use gradient if you want the IG official gradient
                              : "h-6 w-6 text-gray-800",
                        })}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 to-black/10 text-gray-900 relative overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div
            className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
              isVisible.cta
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="cta"
            data-animate
          >
            {/* Header */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Connect with ShodhCraft Infotech?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Reach out to us for IT services, freelancing solutions, project
              support, and professional guidance that helps you implement your
              ideas efficiently.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919175534307"
                className="group inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Call Now
                <Phone className="ml-2 h-5 w-5" />
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={goToServices}
                className="group inline-flex items-center justify-center cursor-pointer bg-transparent text-orange-500 px-8 py-4 rounded-2xl font-semibold border-2 border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
