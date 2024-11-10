import React from "react";
import DefaultSidebar from "../components/DefaultSidebar";
import Profile from "../components/Profile";

const ProfilePage = () => {
  return (
    <div className="flex h-screen">
      
      <div>
        <DefaultSidebar />
      </div>
      
      
      <div className="flex-1 flex items-center justify-center">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
