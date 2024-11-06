import React from "react";
import { DefaultSidebar } from "../components/DefaultSidebar";
import Dashboard from "../components/Dashboard";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar takes up a fixed width */}
      <div>
        <DefaultSidebar />
      </div>
      
      {/* Dashboard fills the remaining space */}
      <div className="flex-1 p-6">
        <Dashboard />
      </div>
    </div>
  );
};

export default HomePage;
