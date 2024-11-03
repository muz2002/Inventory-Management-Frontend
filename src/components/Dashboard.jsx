import { useEffect, useState } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Get the user's name from local storage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Fetch dashboard data with authorization
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8080/item/list-items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Ensure correct token key
          },
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch data. Check your credentials or permissions."
          );
        }

        const data = await response.json();

        // Calculate the total stock by summing up the quantities of each item
        const totalStock = data.reduce((acc, item) => acc + item.quantity, 0);

        setDashboardData({ total_stock: totalStock });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome{userName ? `, ${userName}` : ""}
      </h1>

      {loading ? ( // Conditional rendering for loading state
        <p className="text-gray-500">Loading dashboard data...</p>
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}

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
        </>
      )}
    </div>
  );
}

export default Dashboard;
