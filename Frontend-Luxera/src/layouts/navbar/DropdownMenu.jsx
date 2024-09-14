import React, { useState } from "react";
import { UserIcon, LogOutIcon, SettingsIcon } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

const NavDropdownMenu = () => {
  const { isDarkMode } = useTheme();
  const { Logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggedOut(true);
    try {
      await Logout();
      navigate("/login");
    } catch (error) {
      toast({
        title: "Logging out failed.",
        description: "Please try again, or try clearing your browser cache.",
        variant: "destructive",
      });
    } finally {
      setIsLoggedOut(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-pink-200 transition-colors duration-200 ${
              isDarkMode === "dark" ? "text-white" : "text-slate-950"
            }`}
          >
            <UserIcon className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {links.map((item) => (
            <DropdownMenuItem key={item.name} className="flex items-center gap-2" onClick={() => navigate(item.path)}>
                {item.icon}
                <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
              {isLoggedOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging out</span>
                </>
              ) : (
                <>
                  <LogOutIcon className="h-4 w-4 text-red-500" />
                  <span>Logout</span>
                </>
              )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavDropdownMenu;
