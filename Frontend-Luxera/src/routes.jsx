import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/layouts/Layout";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Dashboard from "@/views/Dashboard/Dashboard";
import NotFoundPage from "@/views/404";
import Collections from "@/views/Collections";
import Profile from "./views/Dashboard/Profile";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <PublicRoute element={<Login />} /> },
      { path: "/register", element: <PublicRoute element={<Register />} /> },
      { path: "/dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
      { path: "/settings", element: <ProtectedRoute element={<Profile />} /> },
      { path: "/collections", element: <Collections /> },
      { path: "/about", element: "About" },
      { path: "/contact", element: "Contact" },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
