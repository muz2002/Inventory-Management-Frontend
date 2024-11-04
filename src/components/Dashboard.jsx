import React, { useEffect, useState } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

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

  return (
    <div className="relative p-6">
      {/* User Profile Picture in Top Right Corner */}
      <div className="absolute top-2 right-6">
        <img
          className={`h-16 w-16 rounded-full border-2 border-green-300 transition-transform duration-300 ${
            isImageEnlarged ? "scale-150" : ""
          }`}
          src={profileImageUrl || "/path/to/defaultImage.jpg"} // Use profileImageUrl or a fallback
          alt="User"
          onClick={handleImageClick}
        />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
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
