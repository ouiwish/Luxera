"use client";

import React, { useState, useEffect } from "react";
import Ripple from "@/components/magicui/ripple";
import { useTheme } from "@/theme";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "@/title";
import { StarIcon } from "lucide-react";
import axiosInstance from "@/api/axios";
import { useNavigate } from "react-router-dom";

const baseReviews = [
  {
    avatar: "/assets/Green.png",
    rating: 5,
    name: "Lisa Johnson",
    title: "CEO of Acme Corp",
    content:
      "The custom design service from this brand is truly exceptional. They listened to my vision and brought it to life perfectly.",
  },
  {
    avatar: "/assets/Black-Red.png",
    rating: 5,
    name: "Diana Smith",
    title: "Designer of XYZ Corp",
    content:
      "I had a fantastic experience with Luxera. Their custom design service exceeded my expectations. The quality of their work is top-notch.",
  },
];

const collections = [
  {
    image: "/assets/Green.png",
    tag: "dresses",
    button: "Dresses",
  },
  {
    image: "/assets/White.png",
    tag: "tops",
    button: "Tops",
  },
  {
    image: "/assets/Blue.png",
    tag: "kingmans",
    button: "Kingmans",
  },
];

export default function Home() {
  const { isDarkMode } = useTheme();
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching the review:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <Title title="Home" />
      <div className={`flex flex-col min-h-dvh`}>
        <section
          className={`relative h-screen overflow-hidden transition-colors duration-200 ${
            isDarkMode === "dark" ? "bg-[rgb(1 10 33 / 0%)]" : "bg-[#fafaf9]"
          }`}
        >
          <Ripple className="absolute w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.0,
                delay: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center text-gray-900 dark:text-white px-4 md:px-0"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Discover the Art of Luxury Fashion
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Explore our exquisite collection of high-quality, handcrafted
                fashion pieces that redefine luxury.
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/collections">
                  <Button className="px-6 py-3 text-sm font-medium rounded-full">
                    Explore Collection
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Top Side - Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 36, y: -16 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, scale: 0.5, x: 36, y: -16 }}
              className="absolute hidden right-36 top-16 md:block"
            >
              <img
                src="/icons/outfit.png"
                alt="Outfit"
                className="w-36 h-36 rotate-12 skew-y-6"
              />
            </motion.div>

            {/* Top Side - Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -36, y: -28 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, scale: 0.5, x: -36, y: -28 }}
              className="absolute hidden left-36 top-28 md:block"
            >
              <img
                src="/icons/sketch.png"
                alt="Sketch"
                className="w-28 h-28 rotate-12 skew-x-6"
              />
            </motion.div>

            {/* Bottom Side - Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -36, y: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, scale: 0.5, x: -36, y: 40 }}
              className="absolute hidden left-36 bottom-40 md:block"
            >
              <img
                src="/icons/dummy.png"
                alt="Dummy"
                className="w-28 h-28 rotate-12 skew-x-6"
              />
            </motion.div>

            {/* Bottom Side - Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 36, y: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, scale: 0.5, x: 36, y: 40 }}
              className="absolute hidden right-36 bottom-40 md:block"
            >
              <img
                src="/icons/dress.png"
                alt="Dress"
                className="w-16 h-16 rotate-12 skew-y-12"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Featured Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg cursor-pointer"
                >
                  <img
                    key={index}
                    src={collection.image}
                    alt={`Collection ${index + 1}`}
                    className="w-full h-82 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/collections?category=${collection.tag}`}>
                      <Button className="px-6 py-3 text-sm font-medium rounded-full">
                        View {collection.button}
                      </Button>
                    </Link>
                  </div>

                  {/* <div className="absolute left-0 bottom-0 p-4 flex items-center justify-center opacity-1 group-hover:opacity-0 transition-opacity duration-200">
                  <Button className="px-2 py-1 text-sm font-medium rounded-full">
                    {Math.floor(Math.random() * 101)} Collection
                  </Button>
                </div>
                <div className="absolute right-0 bottom-0 p-4 flex items-center justify-center opacity-1 group-hover:opacity-0 transition-opacity duration-200">
                  <Button className="px-2 py-1 text-sm font-medium rounded-full">
                    Bespoke
                  </Button>
                </div> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`py-16 md:py-24 ${
            isDarkMode === "dark" ? "bg-[rgb(4 12 34 / 0%)]" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img
                src="/assets/Bittersweet.png"
                alt="Custom Design"
                className="w-full max-w-md rounded-3xl shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Personalized Design Service
              </h2>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Luxera is dedicated to providing exceptional custom design
                services tailored to your unique needs and preferences. Our
                experienced designers work closely with you to create a piece
                that reflects your personal style and elevates your overall
                aesthetic. Whether you're looking for a statement piece, a
                birthday gift, or a one-of-a-kind piece, Luxera is here to help
                you bring your vision to life. Let us be your partner in
                creating truly unique and personalized designs that express your
                individuality and style. Contact us today to inquire about our
                custom design services and let us elevate your style.
              </p>
              <motion.button
                onClick={() => navigate("/register")}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                className="p-2 h-11 px-8 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What Our Clients Say
            </h2>
            <Carousel
              opts={{
                align: "center",
                loop: true,
                autoplay: true,
                autoplayInterval: 2000,
              }}
              className="w-full max-w-3xl mx-auto"
            >
              <CarouselContent className="space-y-4">
                {baseReviews.map((review, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>GG</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating).keys()].map((i) => (
                          <StarIcon key={i} className="w-5 h-5 fill-primary" />
                        ))}
                        {[...Array(5 - review.rating).keys()].map((i) => (
                          <StarIcon
                            key={i}
                            className="w-5 h-5 fill-muted stroke-muted-foreground"
                          />
                        ))}
                      </div>
                      <blockquote
                        className={`text-center ${
                          isDarkMode === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {review.content}
                      </blockquote>
                      <p
                        className={`${
                          isDarkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-800"
                        } font-medium`}
                      >
                        - {review.name}, {review.title}
                      </p>
                    </div>
                  </CarouselItem>
                ))}

                {reviews.slice(-3).map((review) => (
                  <CarouselItem key={review.id}>
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            review.user.profile_image || "/placeholder-user.jpg"
                          }
                        />
                        <AvatarFallback>GG</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating).keys()].map((i) => (
                          <StarIcon key={i} className="w-5 h-5 fill-primary" />
                        ))}
                        {[...Array(5 - review.rating).keys()].map((i) => (
                          <StarIcon
                            key={i}
                            className="w-5 h-5 fill-muted stroke-muted-foreground"
                          />
                        ))}
                      </div>
                      <blockquote
                        className={`text-center ${
                          isDarkMode === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {review.content}
                      </blockquote>
                      <p
                        className={`${
                          isDarkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-800"
                        } font-medium`}
                      >
                        - {review.user.first_name} {review.user.last_name},{" "}
                        {review.title}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );
}
