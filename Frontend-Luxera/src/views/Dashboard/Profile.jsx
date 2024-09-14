"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  EyeOff,
  Eye,
} from "lucide-react";
import Title from "@/title";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const { user, setUser, Profile, UpdatePassword } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsEditingProfile(true);
    setErrors({});

    if (
      user.first_name === profileData.first_name &&
      user.last_name === profileData.last_name &&
      user.phone === profileData.phone &&
      user.location === profileData.location &&
      user.bio === profileData.bio
    ) {
      toast({
        title: "Profile is already up to date",
        description: "Please make changes to update your profile.",
        variant: "info",
      });
      setIsEditingProfile(false);
      return;
    }
    try {
      const response = await Profile(profileData);
      if (response.status === 200) {
        toast({
          title: "Profile updated successfully",
          description: "Your profile has been updated successfully.",
          variant: "success",
        });
        setUser(response.data.user);
      }
    } catch (formErrors) {
      setErrors(formErrors);
    } finally {
      setIsEditingProfile(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsEditingPassword(true);

    // check fields are not empty
    if (
      !passwordData.current_password ||
      !passwordData.password ||
      !passwordData.password_confirmation
    ) {
      toast({
        title: "Empty fields",
        description: "Please fill in all fields, including current password.",
        variant: "destructive",
      });
      setIsEditingPassword(false);
      return;
    }

    try {
      const response = await UpdatePassword(passwordData);
      if (response.status === 200) {
        toast({
          title: "Password updated successfully",
          description: "Your password has been updated successfully.",
          variant: "success",
        });
      }
    } catch (formErrors) {
      console.log(formErrors);
      setErrors(formErrors);
    } finally {
      setIsEditingPassword(false);
    }
  };

  return (
    <>
      <Title title="Profile" />
      <div className="flex flex-col min-h-screen transition-colors duration-100">
        
        <main className="flex-1">
          
          <section className="w-full py-12 md:py-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl text-center font-bold tracking-tighter sm:text-3xl md:text-4xl mb-12">
                Update Profile
              </h2>
              <div className="grid gap-6 lg:grid-cols-2 gap-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          value={profileData.first_name}
                          onChange={handleProfileChange}
                          autoComplete="first_name"
                        />
                        {errors.first_name && (
                          <p className="text-red-500 text-sm">
                            {errors.first_name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={profileData.last_name}
                          onChange={handleProfileChange}
                          autoComplete="last_name"
                        />
                        {errors.last_name && (
                          <p className="text-red-500 text-sm">
                            {errors.last_name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          autoComplete="phone"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          autoComplete="location"
                        />
                        {errors.location && (
                          <p className="text-red-500 text-sm">
                            {errors.location.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                        />
                        {errors.bio && (
                          <p className="text-red-500 text-sm">
                            {errors.bio.message}
                          </p>
                        )}
                      </div>
                      <Button type="submit" disabled={isEditingProfile}>
                        {isEditingProfile ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Update Profile
                          </>
                        ) : (
                          "Update Profile"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_password">
                          Current Password
                        </Label>
                        <Input
                          id="current_password"
                          name="current_password"
                          type="password"
                          value={passwordData.current_password}
                          onChange={handlePasswordChange}
                        />
                        {errors.current_password && (
                          <p className="text-red-500 text-sm">
                            {errors.current_password.message}
                          </p>
                        )}
                      </div>
                      <div className="relative space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type={passwordVisible ? "text" : "password"}
                          value={passwordData.password}
                          onChange={handlePasswordChange}
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
                      <div className="space-y-2">
                        <Label htmlFor="password_confirmation">
                          Confirm Password
                        </Label>
                        <Input
                          id="password_confirmation"
                          name="password_confirmation"
                          type={passwordVisible ? "text" : "password"}
                          value={passwordData.password_confirmation}
                          onChange={handlePasswordChange}
                          required
                        />
                        {errors.password_confirmation && (
                          <p className="text-red-500 text-sm">
                            {errors.password_confirmation.message}
                          </p>
                        )}
                      </div>
                      <Button type="submit" disabled={isEditingPassword}>
                        {isEditingPassword ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Update Password
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Profile;
