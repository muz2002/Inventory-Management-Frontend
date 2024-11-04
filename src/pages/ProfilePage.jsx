import React from "react";
import { DefaultSidebar } from "../components/DefaultSidebar";
import Profile from "../components/Profile";

const ProfilePage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar takes up a fixed width */}
      <div className="bg-green-200"> {/* Adjust width as needed */}
        <DefaultSidebar />
      </div>
      
      {/* Main content fills the remaining space */}
      <div className="flex-1 flex items-center justify-center">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
