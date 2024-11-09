import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";
import Registration from "./components/Registrations";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from "./components/ForgotPassword";
import UsersPage from "./pages/UsersPage";
import ProfileSettingPage from "./pages/ProfileSettingsPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* Redirect to login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element = {<ProfilePage/>} />
        <Route path = "/forgotpassword" element = {<ForgotPassword/>} />
        <Route path = "/users" element = {<UsersPage/>} />
        <Route path = "/settings" element = {<ProfileSettingPage/>} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
