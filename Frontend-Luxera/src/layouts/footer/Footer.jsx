import React from "react";
import { Link } from "react-router-dom";
import { Shirt } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-950 py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shirt className="w-6 h-6" />
              <span className="text-lg font-bold">Luxera</span>
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6">
            <Link
              href="/about"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Terms
            </Link>
          </nav>

          <div className="flex items-center space-x-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Luxera
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
