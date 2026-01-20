import React, { useState, useEffect } from "react";
import {
  Users,
  Target,
  Award,
  Lightbulb,
  Shield,
  Globe,
  UserCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeValue, setActiveValue] = useState(0);

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

    // Observe all sections
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description:
        "We embrace creativity and cutting-edge technology to deliver impactful digital solutions and IT services.",
      color: "from-orange-500 to-black",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity",
      description:
        "We conduct our business with honesty and transparency, ensuring trust in every project and collaboration.",
      color: "from-orange-500 to-black",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We deliver high-quality IT solutions, training programs, and projects with meticulous attention to detail.",
      color: "from-orange-500 to-black",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description:
        "We partner with students, professionals, and businesses to create meaningful solutions and learning experiences.",
      color: "from-orange-500 to-black",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  const achievements = [
    { number: "10+", label: "Technology Domains Covered" },
    { number: "50+", label: "Projects Successfully Delivered" },
    { number: "5+", label: "Years of Industry Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "200+", label: "Satisfied Clients" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section with Advanced Animation */}
      <section className="relative py-15 bg-gray-900 text-white overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 -right-16 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 -left-16 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
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
              <span className="text-white">About</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                ShodhCraft Infotech
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-6xl md:max-w-4xl mx-auto md:mx-0 text-gray-300 leading-relaxed font-light mb-12">
              ShodhCraft Infotech delivers innovative IT solutions, freelancing
              services, and college projects with source code. We empower
              students, professionals, and businesses with hands-on learning,
              real-world projects, internships, and professional training across
              multiple technology domains.
            </p>

            {/* Achievements Cards */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 transform transition-all duration-700 hover:scale-105 hover:bg-orange-500/10 cursor-pointer translate-y-0 opacity-100`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview with Floating Card Design */}
      <section className="relative py-15 bg-gray-50 overflow-hidden">
        {/* Decorative Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/3 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className={`max-w-6xl mx-auto transform transition-all duration-1000 ${
              isVisible.overview
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="overview"
            data-animate
          >
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Who We Are
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-orange-500 to-gray-700 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                ShodhCraft – Crafting Digital Solutions with Purpose. We deliver
                IT services, freelancing solutions, college projects with source
                code, internships, and professional training across multiple
                technology domains.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Highlights */}
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We empower students, professionals, and startups with
                  practical IT solutions, real-world projects, and training
                  programs that bridge the gap between learning and industry.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {[
                    "IT Services",
                    "Freelancing Solutions",
                    "College Projects",
                    "Internships & Training",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white border border-orange-200 px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
                    >
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="text-gray-900 font-medium text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Approach Card */}
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-gray-700 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-all duration-300 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Our Approach
                  </h3>
                  <p className="text-white/90 mb-6 text-sm md:text-base">
                    We combine technology, creativity, and hands-on learning to
                    deliver projects and solutions that make an impact, while
                    preparing students and professionals for real-world
                    challenges.
                  </p>
                  <div className="flex items-center text-white/90 hover:text-white transition-colors cursor-pointer font-medium">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section with Modern Cards */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-gray-50 relative">
        <div className="container mx-auto px-6">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.leadership
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="leadership"
            data-animate
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Leadership
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-black mx-auto mb-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Meet the visionaries behind ShodhCraft Infotech – driving
                innovation, excellence, and real-world IT solutions with
                expertise and passion.
              </p>
            </div>

            {/* Leadership Grid */}
            <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
              {[
                {
                  name: "Jivan Mate",
                  role: "Founder & Managing Partner",
                  gradient: "from-orange-600 to-orange-600",
                },
                {
                  name: "Meghraj Jogdand",
                  role: "Co-Founder & Operations Head",
                  gradient: "from-orange-600 to-orange-600",
                },
              ].map((leader, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${
                    isVisible.leadership
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${leader.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <UserCircle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-gray-700 font-medium mb-4">
                      {leader.role}
                    </p>
                    <div
                      className={`w-16 h-1 bg-gradient-to-r ${leader.gradient} mx-auto rounded-full`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.values
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            id="values"
            data-animate
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Principles that drive our work and shape every project,
                collaboration, and client relationship.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 cursor-pointer transform hover:-translate-y-2 ${
                    isVisible.values
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setActiveValue(index)}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-black mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{value.icon}</div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                    {value.description}
                  </p>

                  {/* Hover Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-black opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Modern Layout */}
      <section className="py-28 text-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Mission & Vision
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Driving innovation and skill development through IT services,
              freelancing solutions, college projects, and professional
              training.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Our Mission",
                content:
                  "Empowering students, freelancers, and businesses with practical IT solutions, real-world projects, and professional training that bridges the gap between learning and implementation.",
                gradient: "from-orange-600 to-orange-600",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Our Vision",
                content:
                  "To become a leading provider of IT services and freelancing solutions, fostering innovation, skill development, and digital transformation across multiple industries.",
                gradient: "from-orange-600 to-orange-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group relative p-10 rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-md transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
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
              Ready to Launch Your Digital Project?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Partner with ShodhCraft Infotech to access expert IT services,
              freelancing solutions, and hands-on project support that turns
              your ideas into reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/services"
                className="group inline-flex items-center justify-center bg-transparent text-orange-500 px-8 py-4 rounded-2xl font-semibold border-2 border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
