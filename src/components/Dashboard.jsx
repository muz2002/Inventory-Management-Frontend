import React, { useEffect, useState, useRef } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Get the user's name and profile image URL from local storage
    const storedUserName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (userId) {
      const storedProfileImageUrl = localStorage.getItem(`profileImageUrl_${userId}`);
      if (storedProfileImageUrl) {
        setProfileImageUrl(storedProfileImageUrl);
      }
    }

    // Fetch dashboard data with authorization
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8080/item/list-items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data. Check your credentials or permissions.");
        }

        const data = await response.json();

        // Calculate the total stock by summing up the quantities of each item
        const totalStock = data.reduce((acc, item) => acc + item.quantity, 0);
        setDashboardData({ total_stock: totalStock });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to toggle image enlargement
  const handleImageClick = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative p-6">
      {/* User Profile Section */}
      <div className="absolute top-2 right-6 flex items-center space-x-4">
        <span className="block font-medium text-black text-sm cursor-pointer">{userName}</span>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700"
            type="button"
          >
            <img
              className={`h-16 w-16 rounded-full border-2 border-green-300 transition-transform duration-300 ${
                isImageEnlarged ? "scale-150" : ""
              }`}
              src={profileImageUrl || "/path/to/defaultImage.jpg"}
              alt="User"
              onClick={handleImageClick}
            />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="z-10 absolute right-0 mt-2 bg-white divide-y divide-indigo-200 rounded-lg shadow w-44 "
            >
              <div className="px-4 py-3 text-sm text-black ">
                <div className="font-medium">Pro User</div>
                <div className="truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-black">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-indigo-400 hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-indigo-400 hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-indigo-400 hover:text-white">Earnings</a>
                </li>
              </ul>
              <div className="py-2">
                <a href="#" className="block px-4 py-2 hover:bg-indigo-400 hover:text-white">Sign out</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-3xl w-full text-white font-extrabold bg-gradient-to-r from-indigo-600 via-indigo-400 to-white py-8 rounded-lg pl-6">
        Welcome{userName ? `, ${userName}` : ""}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading dashboard data...</p>
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Stock Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Stock</h3>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.total_stock || 0}
              </p>
            </div>

            {/* Sales Orders Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Sales Orders</h3>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.sales_orders || 0}
              </p>
            </div>

            {/* Purchase Orders Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Purchase Orders</h3>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.purchase_orders || 0}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
