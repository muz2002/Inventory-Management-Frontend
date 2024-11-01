import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export function DefaultSidebar() {
  return (
    <Card className="h-screen w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col">
      <div className="mb-4 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className="flex-1">
        {" "}
        {/* Makes the List take up available space */}
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          E-Commerce
        </ListItem>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
      <ListItem className="mb-2 hover:bg-indigo-400 hover:text-white transition-colors duration-200">
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </Card>
  );
}
