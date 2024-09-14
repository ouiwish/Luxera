import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/theme";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
