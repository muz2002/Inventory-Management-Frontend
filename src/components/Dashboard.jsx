import React, { useEffect, useState, useRef, useContext } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import defaultProfileImage from "../assets/images/defaultProfile.jpg"; // Import the default profile image
import { ThemeContext } from "../ThemeContext";

// Dummy data for charts
const salesData = [
  { name: 'Jan', sales: 4000, purchases: 2400 },
  { name: 'Feb', sales: 3000, purchases: 1398 },
  { name: 'Mar', sales: 2000, purchases: 9800 },
  { name: 'Apr', sales: 2780, purchases: 3908 },
  { name: 'May', sales: 1890, purchases: 4800 },
  { name: 'Jun', sales: 2390, purchases: 3800 },
  { name: 'Jul', sales: 3490, purchases: 4300 },
];

const topProductsData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(defaultProfileImage); // Initialize with default image
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [timeFilter, setTimeFilter] = useState('week');
  const [filteredData, setFilteredData] = useState(salesData);
  const { theme } = useContext(ThemeContext);

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

  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    // In real app, you would filter actual data here
    setFilteredData(salesData);
  };

  useEffect(() => {
    // Fetch user data including profile image
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      
      if (userId && accessToken) {
        // Retrieve profile image from localStorage
        const storedImageUrl = localStorage.getItem(`profileImageUrl_${userId}`);
        if (storedImageUrl) {
          setProfileImage(storedImageUrl);
        } else {
          // Fallback to fetch from API if not in localStorage
          try {
            const response = await fetch(`http://localhost:8080/users/profileImage/${userId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if (response.ok) {
              const imageBlob = await response.blob();
              const imageUrl = URL.createObjectURL(imageBlob);
              setProfileImage(imageUrl);
              localStorage.setItem(`profileImageUrl_${userId}`, imageUrl);
            } else {
              setProfileImage(defaultProfileImage);
            }
          } catch (error) {
            console.error("Error fetching profile image:", error);
            setProfileImage(defaultProfileImage);
          }
        }

        // Fetch user name
        try {
          const userResponse = await fetch('/api/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (userResponse.ok) {
            const data = await userResponse.json();
            setUserName(data.name);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={`relative p-6 bg-white dark:bg-gray-900 transition-colors`}>
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
              src={profileImageUrl || defaultProfileImage} // Use the default image if profileImageUrl is not set
              alt="User"
              onClick={handleImageClick}
            />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="z-10 absolute right-0 mt-2 bg-white divide-y divide-indigo-200 rounded-lg shadow w-44"
            >
              <div className="px-4 py-3 text-sm text-black">
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

      {/* Filter Controls */}
      <div className="mb-6 flex gap-4 mt-5">
        <button
          onClick={() => handleFilterChange('week')}
          className={`px-4 py-2 rounded ${timeFilter === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Week
        </button>
        <button
          onClick={() => handleFilterChange('month')}
          className={`px-4 py-2 rounded ${timeFilter === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Month
        </button>
        <button
          onClick={() => handleFilterChange('year')}
          className={`px-4 py-2 rounded ${timeFilter === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Year
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sales vs Purchases Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales vs Purchases</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="purchases" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProductsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
