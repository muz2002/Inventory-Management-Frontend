import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import  LogoutButton  from "./LogoutButton";

export function DefaultSidebar() {
  return (
    <Card className="h-screen w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5z flex flex-col bg-green-50">
      <div className="mb-4 p-4 bg-indigo-600 rounded-full flex items-center">
        <ListItemPrefix className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
        </ListItemPrefix>
        <Typography variant="h5" color="white">
          Inventory Management
        </Typography>
      </div>
      <List className="flex-1 text-black">
        <Link
          className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200"
          to="/home"
        >
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Sales Orders
        </ListItem>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </ListItemPrefix>
          Purchase Orders
        </ListItem>
        <Link
          className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200"
          to="/profile"
        >
          <ListItem className="flex">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
      <LogoutButton />
    </Card>
  );
}
