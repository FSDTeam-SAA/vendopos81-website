"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { signOut } from "next-auth/react";

interface UserNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserNavbar = ({ activeTab, setActiveTab }: UserNavbarProps) => {
  const navItems = [
    { label: "Profile", id: "personal" },
    { label: "Change Password", id: "password" },
    { label: "Order History", id: "orders" },
  ]

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
              <Link href={'/'}>
              <Image src={'/images/logo.svg'}  alt="logo" width={40} height={40}/>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={'/'}>
            <button className="text-gray-700 hover:text-primary cursor-pointer">Home</button>
            </Link>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-medium text-sm cursor-pointer transition-colors ${
                  activeTab === item.id 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="ghost" 
              className="text-red-500 hover:text-red-600 cursor-pointer hover:bg-red-50"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar
