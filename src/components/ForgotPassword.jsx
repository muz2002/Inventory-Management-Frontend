import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from '../ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [step, setStep] = useState(1); // Track the current step in the process
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate for redirection
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);

  // Verify Email - Step 1
  const verifyEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/forgotPassword/verifyMail/${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.text();
      setMessage(result);
      if (response.ok) setStep(2); // Move to OTP verification step
    } catch (error) {
      setMessage("Failed to send verification email. Try again.");
    }
  };

  // Verify OTP - Step 2
  const verifyOtp = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/forgotPassword/verifyOtp/${otp}/${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.text();
      setMessage(result);
      if (response.ok) setStep(3); // Move to password reset step
    } catch (error) {
      setMessage("Failed to verify OTP. Try again.");
    }
  };

  // Change Password - Step 3
  const changePassword = async () => {
    if (password !== repeatPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/forgotPassword/changePassword/${email}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, repeatPassword }),
      }
      );
      const result = await response.text();
      setMessage(result);
      if (response.ok) {
        setStep(4); // Move to the final step
        setTimeout(() => {
          navigate("/login"); // Redirect to the login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      setMessage("Failed to change password. Try again.");
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) verifyEmail();
    else if (step === 2) verifyOtp();
    else if (step === 3) changePassword();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
      <div className="antialiased bg-slate-50 dark:bg-gray-800 min-h-screen transition-colors flex items-center justify-center">
        <div className="max-w-lg mx-auto my-10 bg-white dark:bg-gray-700 p-8 rounded-xl shadow shadow-slate-300 dark:shadow-gray-700">
          <h1 className="text-4xl font-medium text-gray-900 dark:text-white">Reset password</h1>
          <p className="text-slate-500 dark:text-gray-300">
            {step === 1 && "Fill up the form to reset the password"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Set your new password"}
            {step === 4 && "Password changed successfully! Redirecting to login..."}
          </p>

          {message && <p className="text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5">
              {step === 1 && (
                <label htmlFor="email">
                  <p className="font-medium text-slate-700 dark:text-gray-300 pb-2">Email address</p>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full py-3 border border-slate-200 dark:border-gray-600 rounded-lg px-3 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-slate-500 dark:focus:border-gray-400 hover:shadow"
                    placeholder="Enter email address"
                    required
                  />
                </label>
              )}

              {step === 2 && (
                <label htmlFor="otp">
                  <p className="font-medium text-slate-700 pb-2">Enter OTP</p>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter OTP"
                    required
                  />
                </label>
              )}

              {step === 3 && (
                <>
                  <label htmlFor="password">
                    <p className="font-medium text-slate-700 pb-2">New Password</p>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter new password"
                      required
                    />
                  </label>
                  <label htmlFor="repeatPassword">
                    <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
                    <input
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Confirm new password"
                      required
                    />
                  </label>
                </>
              )}

              {/* Conditionally render the button based on the step */}
              {step < 4 && (
                <button
                  type="submit"
                  className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>{step === 3 ? "Change Password" : "Submit"}</span>
                </button>
              )}
            </div>
          </form>

          {step === 1 && (
            <Link to="/register">
              <p className="text-center">
                Not registered yet?{" "}
                <span className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                  Register now
                </span>
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
