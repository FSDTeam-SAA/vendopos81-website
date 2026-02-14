"use client";

import NavContainer from "@/components/home/nav/NavContainer";
import { Button } from "@/components/ui/button";
import { useFetchCartData } from "@/lib/hooks/cart";
import { useWishlistData } from "@/lib/hooks/wishlist";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import JoinWithUsDropdown from "../JoinWithUsDropDown";
import ProfileInfo from "./ProfileInfo";

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const NavHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage] = useState(1);
  const [searchData, setSearchData] = useState("");

  const pathname = usePathname();
  const { data } = useWishlistData(currentPage);
  const { data: cartResponse } = useFetchCartData();
  const { data: session } = useSession();

  const wishlist = data?.data?.length || 0;
  const cardLength = cartResponse?.data?.length || 0;

  return (
    <>
      <section>
        <div className="container mx-auto md:px-7 sm:px-4 lg:px-0">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left Section */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>

              {/* Logo */}
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={60}
                  height={58}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
              </Link>

              {/* Desktop Search */}
              <div className="hidden md:flex ml-4 xl:ml-8 w-full max-w-xl">
                <div className="flex flex-1 border-2 border-[#BCE3C9]">
                  <input
                    type="text"
                    onChange={(e) => setSearchData(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full px-3 py-1 outline-none"
                  />
                  <Button className="rounded-none px-6">Search</Button>
                </div>
              </div>
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center space-x-6">
              <JoinWithUsDropdown />

              {/* Wishlist */}
              <Link href="/wishlist">
                <div className="relative cursor-pointer">
                  <Heart size={22} />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {wishlist > 9 ? "9+" : wishlist}
                  </span>
                </div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <div className="relative cursor-pointer">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {cardLength > 9 ? "9+" : cardLength}
                  </span>
                </div>
              </Link>

              {/* Account */}
              <div>
                {session ? (
                  <Link
                    title="click to go dashboard"
                    href="/profile"
                    className="flex items-center gap-2"
                  >
                    <ProfileInfo />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="bg-primary text-white px-4 py-1.5 rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Navbar Icons */}
            <div className="flex md:hidden items-center gap-5 mr-5">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={20} />
              </button>

              <Link href="/wishlist">
                <div className="relative">
                  <Heart size={20} />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                    {wishlist > 9 ? "9+" : wishlist}
                  </span>
                </div>
              </Link>

              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                    {cardLength > 9 ? "9+" : cardLength}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden py-3">
              <div className="flex border-2 border-[#BCE3C9]">
                <input
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-3 py-1 outline-none"
                />
                <Button className="rounded-none">Search</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sidebar Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      {isMenuOpen && (
        <div
          className="fixed left-0 top-0 w-64 h-full bg-white z-50 md:hidden p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between mb-6">
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={() => setIsMenuOpen(false)}
                className={`block p-2 rounded ${
                  pathname === item.link
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <JoinWithUsDropdown />
          </div>

          <div className="mt-5">
            {session ? (
              <Link
                title="click to go dashboard"
                href="/profile"
                className="flex items-center gap-2"
              >
                <ProfileInfo />
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-primary text-white px-4 py-1.5 rounded-sm hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-7 lg:px-0">
        <NavContainer searchData={searchData} />
      </div>
    </>
  );
};

export default NavHeader;
