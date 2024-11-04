import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

export function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user_auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        // Clear tokens and other user data
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <ListItem
        className="text-black mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200"
        onClick={handleOpen} // Open confirmation dialog
      >
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5 mr-3" />
        </ListItemPrefix>
        Log Out
      </ListItem>

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogBody divider>
          <p className="text-black">
            Are you sure you want to log out?
          </p>
        </DialogBody>
        <DialogFooter>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition-colors duration-200"
            onClick={handleOpen}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200"
            onClick={() => {
              handleLogout();
              handleOpen(); // Close the dialog after confirming
            }}
          >
            Log Out
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Logout;
