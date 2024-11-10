import { useState, useContext } from "react";
import { ThemeContext } from '../ThemeContext';
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    setLoading(true); // Start loading

    try {
      // Make a POST request to your backend login endpoint
      const response = await fetch("http://localhost:8080/user_auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed! Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Store data like tokens or user info if needed
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userName", data.name); 
      localStorage.setItem("refreshToken",data.refreshToken);
      localStorage.setItem("userId", data.userId)// Assuming response includes the user's name

      // Redirect to the home page
      navigate("/home");
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 hover:bg-gray-500 dark:hover:bg-yellow-300 transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-6 w-6 text-yellow-300 hover:text-gray-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-500 hover:text-white" />
          )}
        </button>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900  dark:text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgotpassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border dark:bg-gray-700 dark:border-gray-600 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-white">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
