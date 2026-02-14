"use client";

import CountryCard from "@/components/shared/CountryCard";
import { useAllCategory } from "@/lib/hooks/useCategory";
import { Category } from "@/lib/types/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CountryCategory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useAllCategory();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const countryData = data?.data || [];

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto scroll for mobile
  useEffect(() => {
    if (!isMobile || !scrollRef.current || countryData.length <= 0) return;

    const container = scrollRef.current;
    const firstCard = container.querySelector<HTMLAnchorElement>("a");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24;

    let scrollPos = 0;
    const scrollMax = container.scrollWidth - container.clientWidth;

    const interval = setInterval(() => {
      scrollPos += cardWidth + gap;
      if (scrollPos > scrollMax) scrollPos = 0;
      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, countryData.length]);

  // Arrow scroll (desktop only)
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.querySelector<HTMLAnchorElement>("a");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 1.5;

    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // Drag & Touch
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
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft);
    };

    const stopDragging = () => setIsDragging(false);

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", stopDragging);
    el.addEventListener("mouseleave", stopDragging);

    let touchX: number | null = null;
    const onTouchStart = (e: TouchEvent) => (touchX = e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (touchX === null) return;
      el.scrollLeft += touchX - e.touches[0].clientX;
      touchX = e.touches[0].clientX;
    };
    const onTouchEnd = () => (touchX = null);

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", stopDragging);
      el.removeEventListener("mouseleave", stopDragging);

      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, scrollLeft]);

  if (isLoading || countryData.length === 0) return null;

  return (
    <section className="my-10 w-full lg:container lg:mx-auto">
      <div className="relative">
        {/* Desktop Arrows */}
        {!isMobile && countryData.length > 6 && (
          <>
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Scroll Container */}
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar w-full">
          <div
            className={`flex gap-6 py-4 px-4 whitespace-nowrap ${
              countryData.length <= 6 && !isMobile
                ? "justify-center"
                : "justify-start"
            }`}
          >
            {countryData.map((item: Category) => (
              <CountryCard key={item._id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryCategory;
