import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2Icon, TrashIcon, Star, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useTheme } from "@/theme";
import axiosInstance from "@/api/axios";

const Reviews = ({
  reviewLoading,
  userReview,
  setUserReview,
  reviewRating,
  setReviewRating,
  reviewComment,
  setReviewComment,
}) => {
  const { isDarkMode } = useTheme();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleReviewSubmit = async () => {
    setIsLoadingReview(true);
    const credentials = { rating: reviewRating, title: "Client Review - Luxera", content: reviewComment };

    try {
      const endpoint = userReview ? "/reviews/update" : "/reviews";
      const response = await axiosInstance.post(endpoint, credentials);
      setUserReview(response.data);
      setIsReviewDialogOpen(false);
    } catch (error) {
      console.error("Error updating the review:", error);
    } finally {
      setIsLoadingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    setIsLoadingDelete(true);
    try {
      await axiosInstance.post("/reviews/delete");
      setUserReview(null);
      setReviewRating(0);
      setReviewComment("");
    } catch (error) {
      console.error("Error deleting the review:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const renderReviewSection = () => (
    <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">Your Review</h2>
        <Card>
          <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 space-y-4 sm:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < userReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <h2 className={`font-medium ${isDarkMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                {userReview.user.first_name} {userReview.user.last_name} - {userReview.title}
              </h2>
              <blockquote className={` ${isDarkMode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {userReview.content}
              </blockquote>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setReviewRating(userReview.rating);
                  setReviewComment(userReview.content);
                  setIsReviewDialogOpen(true);
                }}
              >
                <Edit2Icon className="h-4 w-4 mr-2" />
                Edit Review
              </Button>
              <Button
                variant="outline"
                disabled={isLoadingDelete}
                onClick={handleDeleteReview}
              >
                {isLoadingDelete ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting Review...
                  </>
                ) : (
                  <>
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete Review
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const renderWriteReviewSection = () => (
    <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-950">
      <div className="container text-center px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">Write a Review</h2>
        <Button onClick={() => setIsReviewDialogOpen(true)}>Write a Review</Button>
      </div>
    </section>
  );

  const renderReviewDialog = () => (
    <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
      <DialogContent className="sm:max-w-[625px] space-y-4">
        <DialogHeader>
          <DialogTitle>
            {userReview ? "Edit Your Review" : "Write a Review"}
            <DialogDescription className="mt-2">Please write your review here.</DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Rating</Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${star <= reviewRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  onClick={() => setReviewRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Cancel</Button>
          <Button disabled={isLoadingReview} onClick={handleReviewSubmit}>
            {isLoadingReview ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                {userReview ? "Updating Review..." : "Submitting Review..."}
              </>
            ) : (
              `${userReview ? "Update Review" : "Submit Review"}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (reviewLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {userReview ? renderReviewSection() : renderWriteReviewSection()}
      {renderReviewDialog()}
    </>
  );
};

export default Reviews;
