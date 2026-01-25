"use client";

import React, { useState, useEffect } from "react";
import NavHeader from "./NavHeader";
import Navitems from "./Navitems";
import { Menu, ChevronDown, Currency } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = lastScrollY - currentScrollY; // Positive when scrolling up

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down: Hide header
          setIsVisible(false);
        } else if(scrollDelta > 5) {
         
          setIsVisible(true);
        }
      } else {
        // Near top: Always show header
          console.log('test 3')

        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <NavHeader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div className="hidden lg:block border-t">
        <Navitems />
      </div>

      {/* Mobile Navigation Toggle Bar */}
      <div className="lg:hidden border-t bg-gray-50/50">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full py-3 text-gray-700"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex items-center gap-2">
              <Menu size={20} className="text-primary" />
              <span className="font-semibold text-sm uppercase tracking-wide">
                Browse Menu
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Content */}
      <div
        className={`lg:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Navitems />
      </div>
    </header>
  );
};

export default Navbar;
