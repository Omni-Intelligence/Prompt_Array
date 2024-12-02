import { 
  HomeIcon, 
  BookOpenIcon, 
  LayersIcon, 
  UsersIcon,
  StarIcon,
  LayoutTemplateIcon,
  Globe2Icon,
  GitBranchIcon,
  Link2Icon,
  WandIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Library from "./pages/Library";
import Groups from "./pages/Groups";
import Favourites from "./pages/Favourites";
import Templates from "./pages/Templates";
import Batches from "./pages/Batches";
import Community from "./pages/Community";
import Chains from "./pages/Chains";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";

export const navItems = [
  {
    title: "Home",
    to: "dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    component: Dashboard,
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Library",
    to: "library",
    icon: <BookOpenIcon className="h-4 w-4" />,
    component: Library,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Groups",
    to: "groups",
    icon: <UsersIcon className="h-4 w-4" />,
    component: Groups,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Community",
    to: "community",
    icon: <Globe2Icon className="h-4 w-4" />,
    component: Community,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Favourites",
    to: "favourites",
    icon: <StarIcon className="h-4 w-4" />,
    component: Favourites,
    color: "from-yellow-500 to-amber-500"
  },
  {
    title: "Templates",
    to: "templates",
    icon: <LayoutTemplateIcon className="h-4 w-4" />,
    component: Templates,
    color: "from-cyan-500 to-blue-500"
  },
  {
    to: "chains",
    title: (
      <div className="flex items-center gap-2">
        Chains
        <Badge variant="outline" className="bg-primary/10 text-primary">Coming Soon</Badge>
      </div>
    ),
    icon: <Link2Icon className="w-4 h-4" />,
    component: Chains,
    color: "from-violet-500 to-purple-500",
    disabled: true
  },
  {
    to: "prompt-assess",
    title: (
      <div className="flex items-center gap-2">
        Prompt Assess
        <Badge variant="outline" className="bg-primary/10 text-primary">Coming Soon</Badge>
      </div>
    ),
    icon: <WandIcon className="w-4 h-4" />,
    component: null,
    color: "from-pink-500 to-rose-500",
    disabled: true
  }
];