import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "@/title";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const { Register: ApiRegister } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsRegistering(true);

    try {
      await ApiRegister(formData);
      navigate("/dashboard");
    } catch (formErrors) {
      setErrors(formErrors);
    }
    finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <Title title="Register" />
      <main className="flex-1 transition-colors duration-300">
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
                  Create an Account
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join us today and start your journey
                </p>
              </div>
              <div className="w-full max-w-sm md:max-w-lg space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="John"
                      />
                      {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                      {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="m@example.com"
                      type="email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="San Francisco, CA"
                      />
                      {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Password Confirmation</Label>
                    <Input
                      id="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="gap-2 flex items-center">
                      <Checkbox
                        id="show-password"
                        className="peer/checkbox"
                        onClick={togglePasswordVisibility}
                      />
                      <Label
                        htmlFor="show-password"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Password
                      </Label>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Register
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </form>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-10">
                  Already have an account?{" "}
                  <Link className="underline underline-offset-2" to="/login">
                    Login
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

export default Register;
