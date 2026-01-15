"use client";

import CountryCard from "@/components/shared/countryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

const CountryCatagory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const data = [
    { value: "africa-all", name: "All Africa", continent: "africa", img: "/region/African.jpg" },
    { value: "Caribbean", name: "Caribbean", continent: "Caribbean", img: "/region/Caribbean.jpeg" },
    { value: "Latino", name: "Latino", continent: "Latino", img: "/region/Latino.webp" },
    { value: "Asian", name: "Philippines", continent: "asia", img: "/region/Asian.jpeg" },
    { value: "Mediterranean", name: "Mediterranean", continent: "Mediterranean", img: "/region/Mediterranean.webp" },
    { value: "North American", name: "North American", continent: "North American", img: "/region/NorthAmerican.webp" },
    { value: "African", name: "African", continent: "African", img: "/region/African.jpg" },
  ];

  // Arrow button scroll
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Mouse wheel horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch & Drag support
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - el.offsetLeft);
      setScrollLeft(el.scrollLeft);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => setIsDragging(false);
    const onMouseLeave = () => setIsDragging(false);

    // Attach mouse events
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);

    // Touch events (already work, but added smoother)
    let startTouchX: number | null = null;
    const onTouchStart = (e: TouchEvent) => (startTouchX = e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (startTouchX === null) return;
      const delta = startTouchX - e.touches[0].clientX;
      el.scrollLeft += delta;
      startTouchX = e.touches[0].clientX;
    };
    const onTouchEnd = () => (startTouchX = null);

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="overflow-hidden py-10 container mx-auto">
      <div className="relative group mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 opacity-90 group-hover:opacity-100 md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 opacity-90 group-hover:opacity-100 md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className={`relative w-full overflow-x-auto scrollbar-hide no-scrollbar cursor-grab ${
            isDragging ? "cursor-grabbing" : ""
          }`}
        >
          <div className="flex w-max gap-8 whitespace-nowrap py-4 px-32">
            {[...data, ...data].map((item, index) => (
              <div key={index} className="inline-block select-none">
                <CountryCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryCatagory;
