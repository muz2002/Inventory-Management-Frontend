import React from 'react';
import profileImage from "../assets/images/profileImage.jpg"

const Profile = () => {
  const profileData = {
    imageUrl: profileImage,
    name: "Muzbuc ",
    title: "Marketing Exec. at Denva Corp",
    bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!",
    status: "Open for sales",
    joinedOn: "2022-04-08",
  };

  return (
    <div className="flex flex-col items-center justify-start h-full p-6 ">
      {/* Status Badge */}
      <div className="mb-4">
        <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{profileData.status}</span>
      </div>
      
      {/* Profile Picture */}
      <div className="relative mb-4 w-36 rounded-full">
        <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
        <img
          className="mx-auto h-auto w-full rounded-full"
          src={profileData.imageUrl}
          alt={profileData.name}
        />
      </div>
      
      {/* User Name and Title */}
      <h1 className="my-1 text-center text-3xl font-bold leading-8 text-gray-900">{profileData.name}</h1>
      <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{profileData.title}</h3>
      
      {/* Bio */}
      <p className="text-center text-md leading-6 text-gray-500 hover:text-gray-600">{profileData.bio}</p>
      
      {/* Joined Date */}
      <div className="mt-3 text-gray-600">
        <span>Joined On: {new Date(profileData.joinedOn).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Profile;
