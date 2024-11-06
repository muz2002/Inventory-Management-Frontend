import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";


export function DefaultSidebar() {
  return (
    <Card className="h-screen transition-all duration-300 ease-in-out w-16 md:w-full md:max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col bg-gray-50">
      <div className="mb-4 p-4 bg-white md:bg-indigo-600 rounded-full flex items-center justify-center md:justify-between">
        <ListItemPrefix className="mr-2 hidden md:block">
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
        <Typography variant="h5" color="white" className="hidden md:block">
          Inventory Management
        </Typography>
        <ListItemSuffix>
          <Bars3Icon className="h-8 w-8 text-black md:text-white ml-1" />
        </ListItemSuffix>
       
      </div>
      <List className="flex-1 text-black">
        <Link
          className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200"
          to="/home"
        >
          <ListItem className="flex items-center justify-center md:justify-start">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden md:block">Dashboard</span>
          </ListItem>
        </Link>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200 flex items-center justify-center md:justify-start">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <span className="hidden md:block">Sales Orders</span>
        </ListItem>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200 flex items-center justify-center md:justify-start">
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
          <span className="hidden md:block">Purchase Orders</span>
        </ListItem>
        <Link
          className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200"
          to="/profile"
        >
          <ListItem className="flex items-center justify-center md:justify-start">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className="hidden md:block">Profile</span>
          </ListItem>
        </Link>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200 flex items-center justify-center md:justify-start">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <span className="hidden md:block">Settings</span>
        </ListItem>
      </List>
      <LogoutButton />
    </Card>
  );
}
