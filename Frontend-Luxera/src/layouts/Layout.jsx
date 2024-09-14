import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Footer from "@/layouts/footer/Footer";
import Navbar from "@/layouts/navbar/Navbar2";
import { useLocation } from "react-router-dom";

const Layout = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow py-12 md:py-16 lg:py-24">
        <Outlet />
      </div>
      <div className="flex-shrink-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
