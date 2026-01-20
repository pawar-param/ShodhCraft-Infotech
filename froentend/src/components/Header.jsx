import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../App";
import logo from "../../public/Image/shodhcraft png.PNG";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  console.log("user", user);
  const isAdmin = user?.email === "admin@gmail.com";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Career", path: "/career" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-9xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              {/* Logo Image */}
              <img
                src={logo}
                alt="ShodhCraft Infotech Logo"
                className=" w-40 object-cover"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-md font-medium px-3 py-2 transition-all duration-200
      ${
        location.pathname === item.path
          ? "text-orange-600 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-[2px] after:bg-orange-600 after:rounded-full"
          : "text-gray-700 hover:text-orange-600 hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:bottom-0 hover:after:w-6 hover:after:h-[2px] hover:after:bg-orange-600 hover:after:rounded-full"
      }
    `}
              >
                {item.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className={`relative text-md font-medium px-3 py-2 transition-all duration-200
      ${
        location.pathname === "/admin"
          ? "text-orange-600 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-[2px] after:bg-orange-600 after:rounded-full"
          : "text-gray-700 hover:text-orange-600 hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:bottom-0 hover:after:w-6 hover:after:h-[2px] hover:after:bg-orange-600 hover:after:rounded-full"
      }
    `}
              >
                Admin Panel
              </Link>
            )}

            {!user ? (
              <Link
                to="/auth/login"
                className="relative cursor-pointer text-md text-gray-700 font-medium px-3 py-2 transition-all duration-200 hover:text-orange-600 hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:bottom-0 hover:after:w-6 hover:after:h-[2px] hover:after:bg-orange-600 hover:after:rounded-full"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="relative cursor-pointer text-md text-gray-700 font-medium px-3 py-2 transition-all duration-200 hover:text-orange-600 hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:bottom-0 hover:after:w-6 hover:after:h-[2px] hover:after:bg-orange-600 hover:after:rounded-full"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-orange-600 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } bg-white shadow-md`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block text-base font-medium px-3 py-2 rounded-md transition ${
                location.pathname === item.path
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-orange-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin"
              className={`block text-base font-medium px-3 py-2 rounded-md transition ${
                location.pathname === "/admin"
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-orange-600"
              }`}
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <Link
              to="/auth/login"
              className="block w-full text-center px-4 py-2 text-base font-medium rounded-md transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-base font-medium rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
