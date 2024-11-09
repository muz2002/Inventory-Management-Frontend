import { useState } from "react";
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
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon 
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export function DefaultSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { icon: <PresentationChartBarIcon className="h-5 w-5" />, text: "Dashboard", path: "/home" },
    { icon: <ShoppingBagIcon className="h-5 w-5" />, text: "Sales Orders", path: "/sales-orders" },
    { icon: <UserCircleIcon className="h-5 w-5" />, text: "Profile", path: "/profile" },
    {icon : <UserGroupIcon className="h-5 w-5" />, text: "Users", path: "/users"},
    { icon: <Cog6ToothIcon className="h-5 w-5" />, text: "Settings", path: "/settings" },
  ];

  return (
    <Card
      className={`h-screen transition-all duration-300 ease-in-out overflow-hidden
      ${isOpen ? "md:w-[16rem]" : "md:w-16"} 
      w-16 p-2 shadow-xl shadow-blue-gray-900/5 flex flex-col bg-gray-50`}
    >
      <div
        className={`mb-4 p-4 ${isOpen ? "bg-indigo-600" : "bg-white"} md:bg-indigo-600  rounded-xl
         flex items-center justify-between transition-colors duration-300`}
      >
        <ListItemPrefix 
          className={`mr-1 ${isOpen ? "md:opacity-100 md:w-auto" : "md:opacity-0 md:w-0"} 
          hidden md:block transition-all duration-300 ease-in-out overflow-hidden`}
        >
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

        <Typography
          variant="h5"
          color="white"
          className={`${isOpen ? "md:block" : "md:hidden"} hidden`}
        >
          Inventory Management
        </Typography>

        <button className="hidden md:block text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <ChevronLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <List className="flex-1 gap-1">
        {navItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <ListItem 
              className={`py-3 px-1.5 ${
                location.pathname === item.path 
                  ? 'bg-indigo-400'
                  : 'hover:bg-indigo-400 hover:text-white'
              }`}
            >
              <ListItemPrefix className="mr-3">
                <div className={location.pathname === item.path ? 'text-white' : ''}>
                  {item.icon}
                </div>
              </ListItemPrefix>
              <Typography 
                className={`
                  ${isOpen ? 'md:block' : 'md:hidden'} 
                  hidden font-normal text-base
                  ${location.pathname === item.path ? 'text-white' : 'text-blue-gray-700'}
                `}
              >
                {item.text}
              </Typography>
            </ListItem>
          </Link>
        ))}
      </List>

      <LogoutButton isOpen={isOpen} />
    </Card>
  );
}
export default DefaultSidebar;