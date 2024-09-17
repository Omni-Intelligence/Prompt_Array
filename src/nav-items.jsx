import { HomeIcon, BookOpenIcon, FileTextIcon, DatabaseIcon, LayersIcon, LinkIcon, Settings2Icon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import Library from "./pages/Library.jsx";

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
    title: "Library",
    to: "/library",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <Library />,
  },
  {
    title: "Templates",
    to: "/templates",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Database",
    to: "/database",
    icon: <DatabaseIcon className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Batches",
    to: "/batches",
    icon: <LayersIcon className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Chains",
    to: "/chains",
    icon: <LinkIcon className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Team Settings",
    to: "/team-settings",
    icon: <Settings2Icon className="h-4 w-4" />,
    page: null,
  },
  {
    title: "Register",
    to: "/register",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Register />,
  },
];
