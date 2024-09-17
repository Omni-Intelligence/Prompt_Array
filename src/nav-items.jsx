import { HomeIcon, UserPlusIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Register",
    to: "/register",
    icon: <UserPlusIcon className="h-4 w-4" />,
    page: <Register />,
  },
];
