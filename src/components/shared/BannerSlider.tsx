"use client";

import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Your Favourite Food Delivered Hot & Fresh",
    description:
      "The World on Your Shelf. From Every Continent to Your Business.",
    image: "/images/bannerimage.png",
    accentColor: "#3BB77E",
    bgPattern:
      "bg-[radial-gradient(circle_at_30%_50%,rgba(59,183,126,0.1)_0%,transparent_50%)]",
  },
  {
    title: "Fresh Groceries at Your Doorstep",
    description:
      "Premium quality fruits, vegetables and daily essentials delivered fresh.",
    image: "/images/bannerimage.png",
    accentColor: "#F74B81",
    bgPattern:
      "bg-[radial-gradient(circle_at_30%_50%,rgba(247,75,129,0.1)_0%,transparent_50%)]",
  },
  {
    title: "Special Discounts Up to 50% Off",
    description:
      "Limited time offers on your favorite products. Don't miss out!",
    image: "/images/bannerimage.png",
    accentColor: "#FFB74D",
    bgPattern:
      "bg-[radial-gradient(circle_at_30%_50%,rgba(255,183,77,0.1)_0%,transparent_50%)]",
  },
];

const BannerSlider = () => {
  const [index, setIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
      setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
    },
    [page],
  );

  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paginate]);

  const slide = slides[index];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  // Touch support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) paginate(1);
    if (diff < -60) paginate(-1);
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F2F3F7] min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] flex items-center"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Decorative background shapes */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.20) 14.42%,
              rgba(255, 255, 255, 0.00) 100%
            ),
          `,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -147px top",
          backgroundSize: "41.2% 147.035%",
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10 py-16 sm:py-20 lg:py-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid lg:grid-cols-2 items-center gap-10 lg:gap-20"
          >
            {/* Content Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 lg:space-y-10 text-left"
            >
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#253D4E] leading-[1.2] lg:leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed font-medium"
              >
                {slide.description}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="relative max-w-md sm:max-w-xl group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <div className="relative flex bg-white rounded-full overflow-hidden border border-gray-100 backdrop-blur-sm">
                  <input
                    placeholder="Your Email Address"
                    className="flex-1 px-4 sm:px-8 py-3 sm:py-5 outline-none text-sm sm:text-base text-gray-700 bg-transparent"
                  />
                  <Button className="rounded-full px-4 sm:px-8 h-auto text-sm sm:text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut" as const,
                delay: 0.2,
              }}
              className="relative w-full aspect-[4/3] lg:aspect-auto h-[250px] sm:h-[350px] lg:h-[500px]"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Hidden on mobile, flex on desktop */}
      <div className="hidden lg:block">
        {/* Left button */}
        <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => paginate(-1)}
            className="bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transition-all duration-300 group hover:scale-110 active:scale-95 border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Right button */}
        <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => paginate(1)}
            className="bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transition-all duration-300 group hover:scale-110 active:scale-95 border border-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

      {/* Progress Indicators (Dots) - Centered on mobile, left-aligned on desktop */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 flex gap-3 sm:gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const diff = i - index;
              if (diff !== 0) paginate(diff);
            }}
            className="group relative h-4 transition-all duration-300"
          >
            <div
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 sm:w-12 bg-primary"
                  : "w-3 sm:w-4 bg-gray-300 group-hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
