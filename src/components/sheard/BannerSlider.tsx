"use client"

import { Search, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: "Your Favourite Food Delivered Hot & Fresh",
      description: "The World on Your Shelf. From Every Continent to Your Business.",
      image: "/images/bannerimage.png",
      bgColor: "linear-gradient(90deg, rgba(0, 0, 0, 0.20) 14.42%, rgba(255, 255, 255, 0.00) 100%)",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      title: "Fresh Groceries at Your Doorstep",
      description: "Premium quality fruits, vegetables and daily essentials delivered fresh.",
      image: "/images/bannerimage.png",
      bgColor: "linear-gradient(90deg, rgba(188, 227, 201, 0.2) 14.42%, rgba(255, 255, 255, 0.00) 100%)",
      buttonText: "Browse Categories",
      buttonLink: "/categories"
    },
    {
      title: "Special Discounts Up to 50% Off",
      description: "Limited time offers on your favorite products. Don't miss out!",
      image: "/images/bannerimage.png", // Fallback to existing image
      bgColor: "linear-gradient(90deg, rgba(255, 183, 77, 0.2) 14.42%, rgba(255, 255, 255, 0.00) 100%)",
      buttonText: "View Deals",
      buttonLink: "/deals"
    }
  ];
    const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);


  // Auto slide functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, nextSlide]);


  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoSlide = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Slider Container */}
      <div className="relative min-h-[700px] lg:min-h-[700px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background with gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: slide.bgColor,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
            
            <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                {/* Text Content */}
                <div className="relative z-10 pt-10 lg:pt-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
                    {slide.description}
                  </p>
                  
                  {/* Search Bar - Hidden on mobile, shown on desktop */}
                  <div className="block md:mb-8">
                    <div className="flex items-center bg-white rounded-full shadow-lg p-1 max-w-xl">
                      <div className="pl-4">
                        <Search size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Your Email Address"
                        className="flex-1 px-4 py-3 outline-none rounded-l-full"
                      />
                      <Button className="rounded-full px-2 md:px-8 py-6 bg-primary hover:bg-primary/90">
                        Subscribe
                      </Button>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {/* <Button className="px-8 py-6 text-lg rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                    {slide.buttonText}
                  </Button> */}
                </div>

                {/* Image */}
                <div className="relative h-full flex items-center justify-center lg:justify-end">
                  <div className="relative w-full aspect-[5/3] max-w-2xl">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="aspect-[5/3] object-center object-contain bg-transparent"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-gray-800" />
        </button>

        {/* Pause/Play Button */}
        <button
          onClick={toggleAutoSlide}
          className="absolute right-4 bottom-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all hover:scale-110"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <Play size={20} className="text-gray-800" />
          ) : (
            <Pause size={20} className="text-gray-800" />
          )}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Search Bar (Fixed at bottom on mobile) */}
      {/* <div className="lg:hidden bg-white py-4 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center bg-gray-50 rounded-full p-1">
            <div className="pl-4">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 outline-none bg-transparent"
            />
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90">
              Go
            </Button>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default BannerSlider;