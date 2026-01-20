import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle inside form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const endpoint = isLogin
        ? `${apiUrl}/auth/login`
        : `${apiUrl}/auth/signup`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(endpoint, payload);

      // ✅ FULL USER OBJECT FROM BACKEND
      const user = res.data.user;

      setMessage(res.data.message || "Success");
      setUser(user);

      // ✅ Store full user details
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50/50 to-yellow-50/30 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isLogin
            ? "Login to access your dashboard"
            : "Sign up to start your journey with ShodhCraft Infotech"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm"
                onChange={handleChange}
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                required
                className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm"
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-500  cursor-pointer text-white py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        {/* Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-orange-500 font-semibold cursor-pointer hover:underline"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
