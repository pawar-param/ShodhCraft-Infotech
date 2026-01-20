import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Users,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
  Mail,
  Clock,
  Star,
  Briefcase,
  Building,
  Globe,
  Shield,
  Zap,
  Code,
  GraduationCap,
  Laptop,
  BookOpen,
  Cloud,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeService, setActiveService] = useState(0);
  const [stats, setStats] = useState({
    placements: 0,
    clients: 0,
    satisfaction: 0,
    experience: 0,
  });

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

  // Animate stats when visible
  useEffect(() => {
    if (isVisible.stats) {
      const animateValue = (start, end, duration, setter) => {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            current = end;
            clearInterval(timer);
          }
          setter(Math.floor(current));
        }, 16);
      };

      animateValue(0, 500, 2000, (val) =>
        setStats((prev) => ({ ...prev, placements: val }))
      );
      animateValue(0, 150, 2000, (val) =>
        setStats((prev) => ({ ...prev, clients: val }))
      );
      animateValue(0, 95, 2000, (val) =>
        setStats((prev) => ({ ...prev, satisfaction: val }))
      );
      animateValue(0, 5, 2000, (val) =>
        setStats((prev) => ({ ...prev, experience: val }))
      );
    }
  }, [isVisible.stats]);

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.hash === "#services") {
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const services = [
    {
      title: "Custom Software Development",
      description:
        "Scalable and secure software solutions tailored to business and startup requirements using modern technologies.",
      icon: <Code className="h-7 w-7" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Web, Mobile & Cloud Solutions",
      description:
        "End-to-end development of responsive web apps, mobile applications, and cloud-based systems.",
      icon: <Cloud className="h-7 w-7" />,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Freelancing & IT Consulting",
      description:
        "Professional freelancing services and expert consulting for web, mobile, backend, and cloud solutions.",
      icon: <Laptop className="h-7 w-7" />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "College Projects with Source Code",
      description:
        "Final-year and academic projects with complete source code, documentation, and technical guidance.",
      icon: <GraduationCap className="h-7 w-7" />,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Internship Programs",
      description:
        "Industry-oriented internships with live projects, mentorship, and real-world development experience.",
      icon: <Users className="h-7 w-7" />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Professional IT Training",
      description:
        "Hands-on training programs across multiple IT domains designed to build job-ready skills.",
      icon: <BookOpen className="h-7 w-7" />,
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  const reasons = [
    {
      icon: <Code className="h-5 w-5 text-amber-500" />,
      text: "End-to-end IT solutions designed for scalability, security, and real-world use cases",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      text: "Over 5+ years of industry experience delivering reliable and impactful technology solutions",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: "Proven track record with 200+ satisfied clients and 50+ successfully delivered projects",
    },

    {
      icon: <Zap className="h-5 w-5" />,
      text: "Agile development approach ensuring faster delivery without compromising quality",
    },

    {
      icon: <Laptop className="h-5 w-5" />,
      text: "Hands-on learning through live projects, real applications, and practical implementations",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      text: "Industry-oriented internships and academic projects with complete source code and guidance",
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Dedicated mentors and experts providing continuous support and technical direction",
    },

    {
      icon: <Shield className="h-5 w-5" />,
      text: "Transparent processes, ethical practices, and long-term relationship focus",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      text: "Continuous innovation and upskilling across modern technologies and domains",
    },
  ];

  const achievements = [
    {
      number: "5",
      suffix: "+",
      label: "Years of Industry Experience",
      icon: <Briefcase className="h-8 w-8" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      number: "200",
      suffix: "+",
      label: "Satisfied Clients",
      icon: <Users className="h-8 w-8" />,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      number: "50",
      suffix: "+",
      label: "Projects Successfully Delivered",
      icon: <CheckCircle className="h-8 w-8" />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      number: "10",
      suffix: "+",
      label: "Technology Domains Covered",
      icon: <Code className="h-8 w-8" />,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden scroll-smooth">
      {/* Hero Section with Advanced Animation */}
      <section className="relative py-15 bg-gray-900 text-white overflow-hidden">
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
              <span className="text-white">Welcome to</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                ShodhCraft Infotech
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl md:max-w-2xl lg:max-w-3xl mx-auto md:mx-0 text-gray-300 leading-relaxed font-light mb-12">
              Crafting smart IT solutions, college projects with source code,
              freelancing services, internships, and professional training to
              bridge the gap between learning and real-world implementation.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-16">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center border border-orange-500 text-orange-500 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Explore Services
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Optional Hero Illustration */}
          <div className="hidden md:block absolute right-0 bottom-0 w-1/2 lg:w-2/5">
            <img
              src="/assets/hero-illustration.png"
              alt="IT Solutions Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.stats
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="stats"
            data-animate
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${
                    isVisible.stats
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.gradient} mb-4`}
                  >
                    <div className="text-white">{achievement.icon}</div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {achievement.number}
                    {achievement.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30"
      >
        <div className="container mx-auto px-6">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.services
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="services"
            data-animate
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Core Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end IT solutions, academic project support, internships,
                and professional training designed to turn ideas into real-world
                impact.
              </p>

              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-gray-500 mx-auto mt-8"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer transform hover:-translate-y-3 ${
                    activeService === index
                      ? "ring-2 ring-orange-500 ring-opacity-50 scale-105"
                      : ""
                  } ${
                    isVisible.services
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-15 bg-slate-50">
        <div className="container mx-auto px-6">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible?.reasons
                ? "translate-y-0 opacity-100"
                : "translate-y-0 opacity-100"
            }`}
            data-animate
          >
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                Why Choose ShodhCraft Infotech?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We deliver reliable IT solutions backed by real-world industry
                experience, followed by hands-on learning, live projects,
                internships, and professional training to drive practical
                outcomes.
              </p>
            </div>

            {/* Reasons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reasons?.map((reason, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300
              hover:shadow-lg hover:border-orange-300 cursor-pointer`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-orange-600/10 text-orange-400 flex items-center justify-center">
                      {reason?.icon}
                    </div>

                    {/* Text */}
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {reason?.text}
                    </p>
                  </div>

                  {/* Accent line */}
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-orange-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 to-black/10 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6">
          <div
            className={`max-w-5xl mx-auto transition-all duration-1000 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            id="contact"
            data-animate
          >
            {/* Header */}
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                Let’s Work Together
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Partner with ShodhCraft Infotech for reliable IT solutions,
                hands-on learning programs, and industry-driven training that
                delivers real results.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Left */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600 text-sm">
                          Pune, Maharashtra, India
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600 text-sm">+91 9175534307</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600 text-sm">
                          shodhcraft@gmail.com
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Business Hours
                        </p>
                        <p className="text-gray-600 text-sm">
                          Monday – Friday, 9:00 AM – 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right CTA */}
                <div className="flex flex-col justify-between bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Ready to Start?
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Connect with our team to discuss IT solutions, training
                      programs, internships, or project collaborations tailored
                      to your goals.
                    </p>
                  </div>

                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center bg-orange-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-orange-700 transition-colors"
                  >
                    Contact ShodhCraft
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
