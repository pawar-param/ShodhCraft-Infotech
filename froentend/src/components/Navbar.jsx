import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../public/Image/shodhcraft png.PNG";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
];

const Navbar = ({ isMobile = false, toggleMenu }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    axios
      .get(`${apiUrl}/auth/user`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const isAdmin = user?.email === "admin@gmail.com";

  // Build nav links based on user
  const filteredItems = [...navItems];
  if (!user) filteredItems.push({ name: "Auth", path: "/auth" });
  if (isAdmin) filteredItems.push({ name: "Admin Panel", path: "/admin" });

  const commonClasses = (item) =>
    location.pathname === item.path
      ? "text-blue-600 bg-blue-50"
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50";

  return (
    <>
      {isMobile ? (
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${commonClasses(
                item
              )}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <nav className="hidden md:flex space-x-8">
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium ${commonClasses(
                item
              )}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navbar;
