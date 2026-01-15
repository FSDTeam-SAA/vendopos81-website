"use client"

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import React, { useEffect, useState, useCallback, useRef } from "react"
import { Button } from "../ui/button"
import Image from "next/image"

const slides = [
  {
    title: "Your Favourite Food Delivered Hot & Fresh",
    description:
      "The World on Your Shelf. From Every Continent to Your Business.",
    image: "/images/bannerimage.png",
    bgColor:
      "linear-gradient(90deg, rgba(0,0,0,0.25) 15%, rgba(255,255,255,0) 100%)",
  },
  {
    title: "Fresh Groceries at Your Doorstep",
    description:
      "Premium quality fruits, vegetables and daily essentials delivered fresh.",
    image: "/images/bannerimage.png",
    bgColor:
      "linear-gradient(90deg, rgba(188,227,201,0.25) 15%, rgba(255,255,255,0) 100%)",
  },
  {
    title: "Special Discounts Up to 50% Off",
    description:
      "Limited time offers on your favorite products. Don't miss out!",
    image: "/images/bannerimage.png",
    bgColor:
      "linear-gradient(90deg, rgba(255,183,77,0.25) 15%, rgba(255,255,255,0) 100%)",
  },
]

const BannerSlider = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number | null>(null)

  const next = useCallback(() => {
    setDirection("right")
    setIndex((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setDirection("left")
    setIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  // Auto slide
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 7000)
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [next, index])

  // Touch support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 60) next()
    if (diff < -60) prev()
    touchStartX.current = null
  }

  const slide = slides[index]

  return (
    <section
      className="relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-[700px] w-full">
        {/* Slide */}
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]
          ${direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}`}
          style={{ background: slide.bgColor }}
        >
          <div className="container mx-auto h-full px-6 grid lg:grid-cols-2 items-center gap-10">
            {/* Text */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-700 max-w-xl mb-8">
                {slide.description}
              </p>

              <div className="flex bg-white rounded-full shadow-lg max-w-xl overflow-hidden">
                <input
                  placeholder="Your Email Address"
                  className="flex-1 px-6 py-4 outline-none"
                />
                <Button className="rounded-full w-[25%] h-full py-4 my-1 p1-2 bg-primary">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full h-[420px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md z-10"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md z-10"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? "right" : "left")
                setIndex(i)
              }}
              className={`h-3 rounded-full transition-all ${
                i === index ? "w-10 bg-white" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BannerSlider
