'use client'
import { Button } from "@/components/ui/button";
import { Heart, MoveRightIcon, ShoppingCart, UserRound, Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NavHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 ">
      <section className="">
        <div className="container mx-auto md:px-7 sm:px-4 lg:px-0">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <div className="shrink-0">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={60}
                  height={58}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
              </div>

              {/* Desktop Search - Hidden on mobile */}
              <div className="hidden lg:flex ml-8 w-full max-w-xl">
                <div className="flex flex-1 items-center border-2 border-[#BCE3C9] rounded-full overflow-hidden">
                  <div className="pl-4">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-3 py-3 outline-none"
                  />
                  <Button className="h-full rounded-none px-6">Search</Button>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Items - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Become a Supplier */}
              <div className="hidden xl:block border">
                <button className="flex items-center gap-2 p-2 text-primary font-medium hover:text-primary/80 transition-colors">
                  Become a Supplier <MoveRightIcon size={16} />
                </button>
              </div>

              {/* Icons Section */}
              <div className="flex items-center space-x-6">
                {/* Wishlist */}
                <button className="relative flex  gap-2 items-center text-gray-600 hover:text-primary transition-colors group">
                  <div className="relative">
                    <Heart size={22} />
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs md:text-base mt-1 hidden sm:block">Wishlist</span>
                </button>

                {/* Cart */}
                <Link href={'cart'} className=" cursor-pointer">
                
                
                <button className="relative flex cursor-pointer gap-2 items-center text-gray-600 hover:text-primary transition-colors group">
                  <div className="relative">
                    <ShoppingCart size={22} />
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs md:text-base mt-1 hidden sm:block">Cart</span>
                </button>
                </Link>

                {/* Account */}
                <button className="flex  gap-2 items-center text-gray-600 hover:text-primary transition-colors group">
                  <UserRound size={22} />
                  <span className="text-xs md:text-base mt-1 hidden sm:block">Account</span>
                </button>
              </div>
            </div>

            {/* Mobile Search and Icons */}
            <div className="flex lg:hidden items-center space-x-4">
              {/* Mobile Search Toggle */}
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>

              {/* Mobile Cart Icon */}
              <Link href={'/cart'} className="  cursor-pointer">
              
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart size={22} />
                <span className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="flex items-center border-2 border-[#BCE3C9] rounded-full overflow-hidden">
                <div className="pl-4">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="flex-1 px-3 py-3 outline-none"
                />
                <Button className="h-full rounded-none px-4">Go</Button>
              </div>
            </div>
          )}
        </div>
       
      </section>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-0 left-0 inset-0 bg-opacity-40 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed left-0 top-16 w-64 h-full bg-white shadow-xl z-50 transform transition-transform lg:hidden">
            <div className="p-6 space-y-8">
              {/* User Info */}
              <div className="flex items-center space-x-3 pb-6 border-b">
                <div className="bg-gray-100 p-2 rounded-full">
                  <UserRound size={24} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Welcome!</p>
                  <p className="text-sm text-gray-500">Sign in or Register</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4">
                <button className="flex items-center justify-between border w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-primary">Become a Supplier</span>
                  <MoveRightIcon size={16} className="text-primary" />
                </button>
                
                <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium">Wishlist</span>
                  <div className="relative">
                    <Heart size={20} />
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
                <Link href={'/cart'} className="cursor-pointer">
                
                <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium">Cart</span>
                  <div className="relative">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
                </Link>
                
                <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium">Account</span>
                  <UserRound size={20} />
                </button>
              </nav>

              {/* Additional Links */}
              {/* <div className="pt-6 border-t space-y-3">
                <a href="#" className="block p-2 text-gray-600 hover:text-primary">Home</a>
                <a href="#" className="block p-2 text-gray-600 hover:text-primary">Categories</a>
                <a href="#" className="block p-2 text-gray-600 hover:text-primary">Deals</a>
                <a href="#" className="block p-2 text-gray-600 hover:text-primary">Help</a>
              </div> */}
            </div>
          </div>
        </>
      )}
       
    </header>
  );
};

export default NavHeader;