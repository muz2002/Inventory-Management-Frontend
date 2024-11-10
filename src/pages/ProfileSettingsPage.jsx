import React from "react";
import DefaultSidebar  from "../components/DefaultSidebar";
import ProfileSettings from "../components/ProfileSettings";

const ProfilePage = () => {
  return (
    <div className="flex h-screen">
      
      <div>
        <DefaultSidebar />
      </div>
      
      
      <div className="flex-1 p-6 overflow-auto">
        <ProfileSettings />
      </div>
    </div>
  );
};

export default ProfilePage;
