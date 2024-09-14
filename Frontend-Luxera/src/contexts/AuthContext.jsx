import { createContext, useState, useEffect, useContext } from "react";
import {
  csrfToken,
  ApigetUser,
  ApiLogin,
  ApiRegister,
  ApiProfile,
  ApiLogout,
  ApiUpdatePassword,
} from "@/services/authApi";
import { handleAuthErrors } from "@/lib/errorsHandler";

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  loading: true,
  setIsAuthenticated: () => {},
  setUser: () => {},
  Login: async () => {},
  Register: async () => {},
  Profile: async () => {},
  Logout: async () => {},
  UpdatePassword: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("AuthToken");
      if (token) {
        try {
          await csrfToken();
          const response = await ApigetUser();
          setIsAuthenticated(true);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          await Logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Updated Login function
  const Login = async (credentials) => {
    try {
      await csrfToken(); // Ensure CSRF token is included
      const response = await ApiLogin(credentials);
      console.log(response);
      localStorage.setItem("AuthToken", response.data.access_token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      return response;
    } catch (error) {
      const formattedErrors = handleAuthErrors(error);
      throw formattedErrors;
    }
  };

  // Updated Register function
  const Register = async (credentials) => {
    try {
      await csrfToken(); // Ensure CSRF token is included
      const response = await ApiRegister(credentials);
      console.log(response);
      localStorage.setItem("AuthToken", response.data.access_token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      return response;
    } catch (error) {
      const formattedErrors = handleAuthErrors(error);
      throw formattedErrors;
    }
  };

  // Updated Register function
  const Profile = async (credentials) => {
    try {
      await csrfToken(); // Ensure CSRF token is included
      const response = await ApiProfile(credentials);
      console.log(response);
      setUser(response.data.user);
      return response;
    } catch (error) {
      const formattedErrors = handleAuthErrors(error);
      throw formattedErrors;
    }
  };


  // Updated UpdatePassword function
  const UpdatePassword = async (credentials) => {
    try {
      await csrfToken(); // Ensure CSRF token is included
      const response = await ApiUpdatePassword(credentials);
      console.log(response);
      return response;
    } catch (error) {
      const formattedErrors = handleAuthErrors(error);
      throw formattedErrors;
    }
  };

  const Logout = async () => {
    try {
      await ApiLogout();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("AuthToken");
      setIsAuthenticated(false);
      setUser({});
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    setIsAuthenticated,
    setUser,
    Login,
    Register,
    Logout,
    Profile,
    UpdatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
