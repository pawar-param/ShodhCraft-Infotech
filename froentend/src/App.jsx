import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState, createContext } from "react";
import { ToastContainer } from "react-toastify"; // <-- import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // <-- import styles
import ScrollToTop from "./utils/scrollTop";

export const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/ping`)
      .then((res) => res.text())
      .then((data) => console.log("✅ Connected to backend:", data))
      .catch((err) => console.error("❌ Backend connection error:", err));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <ScrollToTop /> {/* <-- Add this here */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
          {/* <-- Add ToastContainer here */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
