import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Title from "@/title";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("widad.moumkine@gmail.com");
  const [password, setPassword] = useState("123123123");
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { Login } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || {};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoggingIn(true);

    try {
      await Login({ email, password });
      console.log(from.deal);
      if (from && from.deal) {
        navigate(from.pathname, { replace: true, state: { deal: from.deal } });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (formErrors) {
      setErrors(formErrors);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Title title="Login" />
      <main className="flex-1 transition-colors duration-300">
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
                  Welcome Back
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Enter your credentials to access your account
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute top-9 right-0 transform flex items-center pr-3 cursor-pointer"
                    >
                      {passwordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="gap-2 flex items-center">
                      <Checkbox id="remember" name="remember" className="peer/checkbox" />
                      <Label
                        htmlFor="remember"
                        id="remember"
                        name="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      className="text-sm text-gray-500 dark:text-gray-400 underline underline-offset-2"
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Login
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-10">
                  Don't have an account?{" "}
                  <Link className="underline underline-offset-2" to="/register">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
