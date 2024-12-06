import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const UserNav = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center gap-4'}`}>
        {!isCollapsed && <Button variant="ghost" onClick={() => navigate("/signin")}>Sign Up</Button>}
        <Button onClick={() => navigate("/signin")} className={isCollapsed ? 'w-8 h-8 p-0' : ''}>
          {isCollapsed ? '→' : 'Sign In'}
        </Button>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`relative rounded-full ${isCollapsed ? 'w-8 h-8' : 'w-full flex justify-start gap-2'}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
            <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{user.user_metadata?.full_name || 'User'}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.user_metadata?.full_name || user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/app/dashboard")}>
            Go to Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/app/account")}>
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;