import React from "react";
import DefaultSidebar from "../components/DefaultSidebar";
import Dashboard from "../components/Dashboard";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar takes up a fixed height */}
      <div>
        <DefaultSidebar />
      </div>
      
      {/* Dashboard fills the remaining space and is scrollable */}
      <div className="flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-colors">
        <Dashboard />
      </div>
    </div>
  );
};

export default HomePage;
