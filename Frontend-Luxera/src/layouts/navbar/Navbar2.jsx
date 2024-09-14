import React from "react";
import { useState, useEffect } from "react";
import {
  MoonIcon,
  SunIcon,
  UserIcon,
  MenuIcon,
  DoorClosedIcon,
  LogOutIcon,
  SettingsIcon,
} from "@/components/ui/icons";
import { useTheme } from "@/theme";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import NavDropdownMenu from "./DropdownMenu";
import { Shirt } from "lucide-react";
import { ApiCategories } from "@/lib/fetchCollections";
import NavbarSkeleton from "./NavbarSkeleton";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await ApiCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="md:block hidden">
          <NavbarSkeleton />
        </div>
      ) : (
        <>
          <header
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${
              isDarkMode === "dark"
                ? "bg-[rgb(20 24 33 / 52%)] backdrop-blur-xl text-white-900"
                : "bg-[rgb(135 129 129 / 52%)] backdrop-blur-2xl text-slate-950"
            }`}
          >
            <div className="container mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-center space-x-2"
              >
                <Shirt className="h-7 w-auto" />
                <span className="text-xl font-bold">Luxera</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/collections"
                  className={`hover:underline underline-offset-4 transition-colors font-bold text-medium duration-200 ${
                    isDarkMode === "dark" ? "text-white" : "text-neutral-950"
                  }`}
                >
                  Collections
                </Link>
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    to={`/collections?category=${item.slug}`}
                    className={`hover:underline underline-offset-4 transition-colors font-bold text-medium duration-200 ${
                      isDarkMode === "dark" ? "text-white" : "text-neutral-950"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTheme()}
                  className={`rounded-full p-2 hover:bg-pink-200 transition-colors duration-200 ${
                    isDarkMode === "dark" ? "text-white" : "text-slate-950"
                  }`}
                >
                  {isDarkMode === "dark" ? (
                    <SunIcon className="h-6 w-6" />
                  ) : (
                    <MoonIcon className="h-6 w-6" />
                  )}
                  <span className="sr-only">Toggle dark mode</span>
                </Button>

                {isAuthenticated ? (
                  <NavDropdownMenu />
                ) : (
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover:bg-pink-200 transition-colors duration-200 ${
                        isDarkMode === "dark" ? "text-white" : "text-slate-950"
                      }`}
                    >
                      <UserIcon className="h-6 w-6" />
                    </Button>
                  </Link>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden hover:bg-pink-200 transition-colors duration-200 ${
                  isDarkMode === "dark" ? "text-white" : "text-slate-950"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className={`h-6 w-6`} />
              </Button>
            </div>
          </header>
          <div
            className={`fixed top-0 left-0 w-full h-full md:hidden bg-black bg-opacity-80 z-50 flex items-center justify-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div
              className={`w-full h-full flex flex-col ${
                isDarkMode === "dark"
                  ? "text-white bg-slate-950"
                  : "text-gray-900 bg-white"
              }`}
            >
              <div className="px-6 py-4 flex items-center justify-between border-b">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-center space-x-2 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  <Shirt className="h-7 w-auto" />
                  <span className="text-xl font-bold">Luxera</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <DoorClosedIcon className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex-1 px-12 py-12 space-y-4 flex flex-col md:flex-row md:space-x-6 md:space-y-0">
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    to={`/collections?category=${item.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold duration-200 mb-4 sm:mb-0 sm:mr-4 flex items-center`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="px-6 py-4 border-t flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTheme()}
                  className={`rounded-full p-2 hover:bg-pink-200 transition-colors duration-200 ${
                    isDarkMode === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {isDarkMode === "dark" ? (
                    <SunIcon className="h-6 w-6" />
                  ) : (
                    <MoonIcon className="h-6 w-6" />
                  )}
                  <span className="sr-only">Toggle dark mode</span>
                </Button>

                {isAuthenticated ? (
                  <>
                    <Link to="/settings">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`hover:bg-pink-200 transition-colors duration-200 ${
                          isDarkMode === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <SettingsIcon className="h-6 w-6" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      //onClick={() => logout()}
                      className={`hover:bg-pink-200 transition-colors duration-200 ${
                        isDarkMode === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <LogOutIcon className="h-6 w-6" />
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover:bg-pink-200 transition-colors duration-200 ${
                        isDarkMode === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <UserIcon className="h-6 w-6" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
