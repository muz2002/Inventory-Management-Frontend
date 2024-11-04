import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const profileData = {
    name: "Muzbuc",
    title: "Marketing Exec. at Denva Corp",
    bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!",
    status: "Open for sales",
    joinedOn: "2022-04-08",
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    if (userId && accessToken) {
      const storedImageUrl = localStorage.getItem(`profileImageUrl_${userId}`);
      if (storedImageUrl) {
        setProfileImageUrl(storedImageUrl);
      }

      const fetchUserProfile = async () => {
        try {
          const imageResponse = await fetch(`http://localhost:8080/users/profileImage/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (imageResponse.status === 404) {
            setProfileImageUrl(null); // No profile image exists for this user
            localStorage.removeItem(`profileImageUrl_${userId}`);
            return;
          } else if (!imageResponse.ok) {
            throw new Error("Failed to fetch profile image");
          }

          const imageBlob = await imageResponse.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfileImageUrl(imageUrl);

          // Store the image URL with user-specific key
          localStorage.setItem(`profileImageUrl_${userId}`, imageUrl);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      };

      fetchUserProfile();
    }

    // Clear the previous user's image when a new user logs in
    return () => {
      const previousUserId = localStorage.getItem("userId");
      if (previousUserId && previousUserId !== userId) {
        localStorage.removeItem(`profileImageUrl_${previousUserId}`);
      }
    };
  }, []);

  const handleFileChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!profileImageFile) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("file", profileImageFile);

    try {
      const response = await fetch(
        `http://localhost:8080/users/uploadProfileImage/${localStorage.getItem("userId")}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      alert(result.message || "Image uploaded successfully!");

      const fullImageUrl = `http://localhost:8080${result.imageUrl}`;
      setProfileImageUrl(fullImageUrl);

      localStorage.setItem(`profileImageUrl_${localStorage.getItem("userId")}`, fullImageUrl);
    } catch (error) {
      console.error(error);
      alert("Error uploading image: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full p-6">
      {/* Status Badge */}
      <div className="mb-4">
        <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
          {profileData.status}
        </span>
      </div>

      {/* Profile Picture */}
      <div className="relative mb-4 w-36 rounded-full">
        <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
        {profileImageUrl ? (
          <img
            className="mx-auto h-auto w-full rounded-full"
            src={profileImageUrl}
            alt={profileData.name}
          />
        ) : (
          <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        className="mb-4 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
        onClick={() => fileInputRef.current.click()}
      >
        +
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={uploadImage} className="bg-blue-500 text-white p-2">
        Upload Image
      </button>

      {/* User Name and Title */}
      <h1 className="my-1 text-center text-3xl font-bold leading-8 text-gray-900">
        {profileData.name}
      </h1>
      <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
        {profileData.title}
      </h3>

      {/* Bio */}
      <p className="text-center text-md leading-6 text-gray-500 hover:text-gray-600">
        {profileData.bio}
      </p>

      {/* Joined Date */}
      <div className="mt-3 text-gray-600">
        <span>
          Joined On: {new Date(profileData.joinedOn).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default Profile;
