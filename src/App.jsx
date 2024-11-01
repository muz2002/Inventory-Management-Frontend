import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import React from "react";
import Registration from "./components/Registrations";
import LoginPage from "./pages/LoginPage";
import { DefaultSidebar } from "./components/DefaultSidebar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* Redirect to login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path = "/sidebar" element= {<DefaultSidebar/>} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
