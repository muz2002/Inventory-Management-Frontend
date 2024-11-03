import { useEffect, useState } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get the user's name from local storage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Fetch dashboard data
    fetch("http://localhost:8080/item")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome {userName ? `, ${userName}` : ""}{" "}
        {/* Display user's name if available */}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Stock Card */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Total Stock
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {dashboardData.total_stock || 0}
          </p>
        </div>

        {/* Sales Orders Card */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Sales Orders
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {dashboardData.sales_orders || 0}
          </p>
        </div>

        {/* Purchase Orders Card */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Purchase Orders
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {dashboardData.purchase_orders || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
