"use client";
import { Button } from "@/components/ui/button";
import { useWishlistData } from "@/lib/hooks/wishlist";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MoveRightIcon,
  ShoppingCart,
  UserRound,
  Menu,
  X,
  Search,
  ChevronDownIcon,
  Package,
  Truck,
  ChevronDown,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useFetchCartData } from "@/lib/hooks/cart";

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const NavHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();

  const { data } = useWishlistData(currentPage);
  const { data: cartResponse, isLoading, isError } = useFetchCartData();

  const { data: session } = useSession();

  const wishlist = data?.data?.length || 0;
  console.log("card data", cartResponse?.data?.length);
  const cardLength = cartResponse?.data?.length || 0;
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
              <Link href={"/"}>
                <div className="shrink-0">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={60}
                    height={58}
                    className="h-12 w-12 sm:h-14 sm:w-14"
                  />
                </div>
              </Link>

              {/* Desktop Search - Hidden on mobile */}
              <div className="hidden md:flex ml-4 xl:ml-8 w-full max-w-sm lg:max-w-md xl:max-w-xl">
                <div className="flex flex-1 items-center border-2 border-[#BCE3C9]  overflow-hidden">
                  {/* <div className="pl-4">
                    <Search size={20} className="text-gray-400" />
                  </div> */}
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-3 py-2 outline-none"
                  />
                  <Button className="h-full rounded-none px-6">Search</Button>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Items - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-8">
              {/* Become a Supplier */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      <Package className="h-4 w-4 mr-1" />
                      JOIN WITH US <ChevronDown size={16} className="ml-1" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={10}
                      className="w-48 bg-white border border-gray-100 shadow-xl rounded-lg p-1 z-[60]"
                    >
                      <Link href="/driver">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md transition-colors focus:bg-primary/10 focus:text-primary outline-none">
                          <Truck className="h-4 w-4" />
                          <span>As a Driver</span>
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/vendor">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md transition-colors focus:bg-primary/10 focus:text-primary outline-none mt-1">
                          <Package className="h-4 w-4" />
                          <span>As a Supplier</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </div>
              {/* Icons Section */}
              <div className="flex items-center space-x-6">
                {/* Wishlist */}
                <Link href={"/wishlist"}>
                  <div className="relative flex  gap-2 items-center text-gray-600 hover:text-primary transition-colors group">
                    <div className="relative">
                      <Heart size={22} />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlist > 9 ? "9+" : wishlist}
                      </span>
                    </div>
                    <span className="text-xs xl:text-base mt-1 hidden xl:block">
                      Wishlist
                    </span>
                  </div>
                </Link>

                {/* Cart */}
                <Link href={"/cart"} className=" cursor-pointer">
                  <div className="relative flex cursor-pointer gap-2 items-center text-gray-600 hover:text-primary transition-colors group">
                    <div className="relative">
                      <ShoppingCart size={22} />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cardLength > 9 ? "9+" : cardLength}
                      </span>
                    </div>
                    <span className="text-xs xl:text-base mt-1 hidden xl:block">
                      Cart
                    </span>
                  </div>
                </Link>

                {/* Account */}
                <div>
                  {session ? (
                    <Link
                      href="/profile"
                      className="flex gap-2 items-center cursor-pointer text-gray-600 hover:text-primary transition-colors group"
                    >
                      <UserRound size={20} />
                      <span className="font-medium">Account</span>
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="flex gap-2 items-center bg-primary text-white py-0.5 px-2 rounded-sm cursor-pointer  hover:bg-primary/90  transition-colors group"
                    >
                      {/* <UserRound size={20} /> */}
                      <span className="font-medium">Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Search and Icons */}
            <div className="flex md:hidden items-center space-x-4">
              {/* Mobile Search Toggle */}
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>

              {/* Mobile Cart Icon */}
              <Link href={"/cart"} className="  cursor-pointer">
                <button className="relative p-2 hover:bg-gray-100 rounded-full">
                  <ShoppingCart size={22} />
                  <span className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cardLength > 9 ? "9+" : cardLength}
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden py-4 border-t">
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
            className="fixed top-0 left-0 inset-0 bg-opacity-40 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed left-0 top-16 w-64 h-full bg-white shadow-xl z-50 transform transition-transform md:hidden">
            <div className="p-6 space-y-2">
              {/* User Info */}
              <div className="flex items-center space-x-3  ">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors px-3 justify-start w-full"
                    >
                      <Package className="h-5 w-5 mr-3 text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="text-base">JOIN OUR TEAM</span>
                      <ChevronDown size={16} className="ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuContent
                      align="start"
                      className="w-56 bg-white border border-gray-100 shadow-xl rounded-lg p-1 z-[110]"
                      sideOffset={5}
                    >
                      <Link href="/driver" className="block w-full">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md transition-all outline-none">
                          <Truck className="h-5 w-5" />
                          <span className="font-medium">As a Driver</span>
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/vendor" className="block w-full mt-1">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md transition-all outline-none">
                          <Package className="h-5 w-5" />
                          <span className="font-medium">As a Supplier</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>

                <Link href="/wishlist">
                  <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Wishlist</span>
                    <div className="relative">
                      <Heart size={20} />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlist > 9 ? "9+" : wishlist}
                      </span>
                    </div>
                  </button>
                </Link>
                <Link href={"/cart"} className="cursor-pointer">
                  <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Cart</span>
                    <div className="relative">
                      <ShoppingCart size={20} />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cardLength > 9 ? "9+" : cardLength}
                      </span>
                    </div>
                  </button>
                </Link>

                {session ? (
                  <Link href="/profile">
                    <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="font-medium">Account</span>
                      <UserRound size={20} />
                    </button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <button className="flex items-center justify-between bg-primary text-white w-full p-3 rounded-sm hover:bg-primary/90 transition-colors">
                      <span className="font-medium">Login</span>
                      {/* <UserRound size={20} /> */}
                    </button>
                  </Link>
                )}
              </nav>

              {/* Main Navigation Links */}
              <div className=" space-y-2 ">
                {/* <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Navigation</p> */}
                {NAV_ITEMS.map((item, index) => {
                  const isActive = pathname === item.link;
                  return (
                    <Link
                      href={item.link}
                      key={index}
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative block p-3 rounded-lg font-medium transition-colors ${
                        isActive
                          ? "bg-primary/5 text-primary"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Additional Links */}
              {/* <div className="pt-4 border-t space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Support</p>
                <a href="#" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
              </div> */}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default NavHeader;
