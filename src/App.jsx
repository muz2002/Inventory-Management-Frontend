import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import Registration from "./components/Registrations";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from "./components/ForgotPassword";
import UsersPage from "./pages/UsersPage";
import ProfileSettingPage from "./pages/ProfileSettingsPage";
import  Modal  from "./components/Modal";

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
      return savedTheme;
    }
    return "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Redirect to login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<ProfileSettingPage />} />
          <Route path="/modal" element={<Modal />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
