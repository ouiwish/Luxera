"use client";

// External Libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// UI Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Icons
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  Settings,
  TrashIcon,
  InfoIcon,
  Loader2,
  Upload,
  Check,
  X,
} from "lucide-react";

// Utilities and APIs
import axiosInstance from "@/api/axios";
import { formatDate } from "@/lib/formatDate";
import { ApiSignedDeals, ApiUnSignDeal } from "@/lib/fetchCollections";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/theme";

// Custom Components
import Ripple from "@/components/magicui/ripple";
import Title from "@/title";
import PayPalButton from "./PaypalButton";
import Reviews from "./Reviews";
import Deals from "./Deals";

const Dashboard = () => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const { user, Profile } = useAuth();

  // State
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(
    user.profile_image || "/placeholder-user.jpg"
  );
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(user.profile_image);
  const [selectedDeal, setSelectedDeal] = useState(null);

  // Review
  const [userReview, setUserReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(true);

  // Functions
  const fetchDeals = async () => {
    setDealsLoading(true);
    try {
      const response = await ApiSignedDeals();
      setDeals(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setDealsLoading(false);
    }
  };

  const fetchUserReview = async () => {
    try {
      const response = await axiosInstance.get("/reviews/get");

      if (response.status !== 200) {
        return;
      }

      setUserReview(response.data);
      setReviewRating(response.data.rating);
      setReviewComment(response.data.content);
    } catch (error) {
      console.error("Error fetching the review:", error);
    } finally {
      setReviewLoading(false);
    }
  };

  const loadPayPalScript = () => {
    if (!document.querySelector('script[src*="paypal.com/sdk/js"]')) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID
        }&currency=USD`;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const onImageClick = (e) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setUploadedImage(imageURL);
        setSelectedFile(file);
        setIsAvatarDialogOpen(true);
      }
    };
  };

  const handleSaveAvatar = async () => {
    setIsUploadingAvatar(true);
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profile_image", selectedFile);

    try {
      const response = await Profile(formData);
      if (response.status === 200) {
        toast({
          title: "Profile image updated successfully",
          description: "Your profile image has been updated successfully.",
          variant: "success",
        });
        setSelectedAvatar(response.data.user.profile_image);
        setUploadedImage(null);
        setIsAvatarDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast({
        title: error?.profile_image?.message
          ? "Invalid profile image"
          : "Failed to update profile image",
        description:
          error?.profile_image?.message ||
          "There was an error updating your profile image.",
        variant: "destructive",
      });
      setSelectedFile(null);
      setUploadedImage(null);
      setIsAvatarDialogOpen(false);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCancelAvatar = () => {
    setIsAvatarDialogOpen(false);
    setUploadedImage(null);
    setSelectedFile(null);
  };

  const openDialogView = (deal) => {
    setSelectedDeal(deal);
    setIsViewDialogOpen(true);
  };

  const closeDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedDeal(null);
  };

  const handleUnSign = async () => {
    // handlingunsing button
    setDealsLoading(true);
    setIsDeleteDialogOpen(true);
    try {
      const response = await ApiUnSignDeal({ deal_id: selectedDeal.deal_id });
      closeDialog();
      if (response.status === 200) {
        const response = await ApiSignedDeals();
        setDeals(response.data);
        toast({
          title: "Deal unsigned",
          description: "Your deal has been unsigned successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error unsigning deal:", error);
      toast({
        title: "Failed to unsign deal",
        description:
          "There was an error unsigning your deal, please try again.",
        variant: "destructive",
      });
    } finally {
      setDealsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchUserReview();
    loadPayPalScript();
    fetchDeals();
  }, []);

  return (
    <>
      <Title title="Dashboard" />
      <div className="flex flex-col min-h-screen transition-colors duration-100">
        <main className="flex-1">
          <section
            className={`relative overflow-hidden w-full py-12 md:py-24 lg:py-32 shadow-lg 
            ${isDarkMode === "dark"
                ? "border-b-2 border-gray-900"
                : "border-b-2 border-gray-300"
              }`}
          >
            <Ripple className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="relative z-10 container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-4">
                  {/* Avatar Upload Section */}
                  <div className="relative inline-block">
                    <Avatar
                      className={`mx-auto w-36 h-36 ${isDarkMode === "dark"
                          ? "box-border border-2 border-gray-700"
                          : "box-border border-2 border-gray-400"
                        }`}
                    >
                      <AvatarImage
                        alt="User Avatar"
                        className="rounded-full"
                        src={selectedAvatar || "/placeholder-user.jpg"}
                      />
                      <AvatarFallback delayMs={500}>
                        <InfoIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      className="absolute bottom-0 right-0 rounded-full p-1 bg-primary hover:bg-primary/90"
                      size="icon"
                      onClick={onImageClick}
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload new avatar</span>
                    </Button>
                  </div>

                  {/* Dialog for Image Preview */}
                  <Dialog
                    open={isAvatarDialogOpen}
                    onOpenChange={setIsAvatarDialogOpen}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Preview Avatar</DialogTitle>
                        <DialogDescription>
                          Preview your new avatar, then save your changes.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Avatar className="w-36 h-36">
                            <AvatarImage
                              alt="Selected Avatar"
                              className="rounded-full"
                              src={uploadedImage}
                            />
                            <AvatarFallback delayMs={500}>
                              <InfoIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={handleCancelAvatar}>
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isUploadingAvatar}
                          onClick={handleSaveAvatar}
                        >
                          {isUploadingAvatar ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Save Changes
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {user?.first_name} {user?.last_name}
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    {user?.bio ||
                      "Welcome to Luxera | Update your bio! | Add your profile image"}
                  </p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Link to="/collections">
                      <Button variant="outline">Explore Collection</Button>
                    </Link>
                    <Link to="/settings">
                      <Button>
                        <Settings className="h-4 w-4 mr-1" />
                        Profile Settings
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className={`w-full py-12 md:py-16 bg-gray-100 dark:bg-gray-900`}
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <MailIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{user?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{user?.location || "Unknown"}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                      <span>Joined {formatDate(user?.created_at)}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Learn About Deals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Collaborative Deals</AccordionTrigger>
                        <AccordionContent>
                          Royalty-Based Agreements, Equity Partnership, Content
                          Creation Exchange
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Barter Arrangements</AccordionTrigger>
                        <AccordionContent>
                          Service Exchange, Product Exchange, Event Sponsorship
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          Licensing Agreements
                        </AccordionTrigger>
                        <AccordionContent>
                          Design Licensing: License your designs to brands or
                          manufacturers for a set period
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Community Projects</AccordionTrigger>
                        <AccordionContent>
                          Pro Bono Work, Collaborative Collections
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Deals
            deals={deals}
            dealsLoading={dealsLoading}
            openDialogView={openDialogView}
          />

          <Reviews
            reviewLoading={reviewLoading}
            userReview={userReview}
            setUserReview={setUserReview}
            reviewRating={reviewRating}
            setReviewRating={setReviewRating}
            reviewComment={reviewComment}
            setReviewComment={setReviewComment}
          />
        </main>

        {selectedDeal && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[750px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {selectedDeal.deal.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedDeal.deal.category.name}
                </p>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <img
                  src={selectedDeal.deal.image}
                  alt={selectedDeal.deal.name}
                  className="w-full h-86 sm:h-96 object-cover rounded-2xl"
                />

                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-1">
                    <p className="text-lg text-primary font-semibold">
                      Price: ${selectedDeal.deal.original_price}.00
                    </p>
                    <p className="text-lg text-primary font-semibold">
                      Discount Price: ${selectedDeal.deal.deal_price}.00
                    </p>
                  </div>
                  <DialogDescription>
                    <span className="bg-primary/10 text-primary text-sm font-semibold py-2 px-2 rounded-2xl">
                      Saved {selectedDeal.deal.discount}%
                    </span>
                  </DialogDescription>
                </div>

                {selectedDeal.status === "pending" && (
                  <PayPalButton
                    DealID={selectedDeal.deal.id}
                    SignedID={selectedDeal.id}
                    handlerCloseDialog={() => closeDialog()}
                    loadDeals={() => fetchDeals()}
                  />
                )}
              </div>
              <DialogFooter className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto md:mt-2"
                  onClick={closeDialog}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>

                {selectedDeal.status === "pending" ? (
                  <Button
                    className="w-full sm:w-auto bg-success text-gray-200 hover:bg-success/90"
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <InfoIcon className="h-4 w-4 mr-2" />
                    Saved {selectedDeal.deal.discount}%
                  </Button>
                ) : (
                  <Button className="w-full sm:w-auto bg-success text-gray-200 disabled hover:bg-success/90">
                    <Check className="h-4 w-4 mr-2" />
                    Approveed Deal
                  </Button>
                )}

                {selectedDeal.status === "pending" && (
                  <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Unsign
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to unsign this deal?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          unsign the deal from your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsDeleteDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleUnSign}>
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Dashboard;
