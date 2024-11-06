import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBody, DialogFooter, Typography, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

function LogoutButton({ isOpen }) {
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
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <ListItem className="hover:bg-indigo-400 hover:text-white focus:bg-indigo-50 py-3" onClick={handleOpen}>
        <ListItemPrefix className="mr-4">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        </ListItemPrefix>
        <Typography 
          className={`${isOpen ? 'md:block' : 'md:hidden'} hidden font-normal text-base text-blue-gray-700`}
        >
          Sign Out
        </Typography>
      </ListItem>

      <Dialog open={open} handler={handleOpen}>
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
              handleOpen();
            }}
          >
            Sign Out  
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default LogoutButton;
