import { 
  HomeIcon, 
  BookOpenIcon, 
  FileTextIcon, 
  LayersIcon, 
  LinkIcon, 
  Settings2Icon,
  DollarSignIcon,
  UsersIcon,
  StarIcon,
  LayoutTemplateIcon
} from "lucide-react";
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import Library from "./pages/Library.jsx";
import Payments from "./pages/Payments.jsx";
import Groups from "./pages/Groups.jsx";
import Favourites from "./pages/Favourites.jsx";
import Templates from "./pages/Templates.jsx";
import Batches from "./pages/Batches.jsx";
import Chains from "./pages/Chains.jsx";
import TeamSettings from "./pages/TeamSettings.jsx";

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
    title: "Payments",
    to: "/payments",
    icon: <DollarSignIcon className="h-4 w-4" />,
    page: <Payments />,
  },
  {
    title: "Groups",
    to: "/groups",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <Groups />,
  },
  {
    title: "Favourites",
    to: "/favourites",
    icon: <StarIcon className="h-4 w-4" />,
    page: <Favourites />,
  },
  {
    title: "Templates",
    to: "/templates",
    icon: <LayoutTemplateIcon className="h-4 w-4" />,
    page: <Templates />,
  },
  {
    title: "Batches",
    to: "/batches",
    icon: <LayersIcon className="h-4 w-4" />,
    page: <Batches />,
  },
  {
    title: "Chains",
    to: "/chains",
    icon: <LinkIcon className="h-4 w-4" />,
    page: <Chains />,
  },
  {
    title: "Team Settings",
    to: "/team-settings",
    icon: <Settings2Icon className="h-4 w-4" />,
    page: <TeamSettings />,
  },
  {
    title: "Register",
    to: "/register",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Register />,
  },
];