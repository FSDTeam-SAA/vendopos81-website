"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface UserNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserNavbar = ({ activeTab, setActiveTab }: UserNavbarProps) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
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
            
            <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-red-600 cursor-pointer hover:bg-red-50"
                >
                  Log Out
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Confirm Logout</DialogTitle>
                  <DialogDescription className="text-gray-500 pt-2">
                    Are you sure you want to log out of your account? You will need to sign in again to access your profile.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-3 sm:gap-0 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
