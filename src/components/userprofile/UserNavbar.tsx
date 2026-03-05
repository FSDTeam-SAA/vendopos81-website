"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "../shared/AuthModal";


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
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={"/"}>
                <Image
                  src={"/images/logo.svg"}
                  alt="logo"
                  width={40}
                  height={40}
                />
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href={"/"}>
                <button className="text-gray-700 hover:text-primary cursor-pointer">
                  Home
                </button>
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

              {/* Logout Button */}
              <Button
                variant="destructive"
                onClick={() => setIsLogoutModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* AuthModal এখানে call করলাম */}
      <AuthModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        noNeed={true}
        onLogout={handleLogout}
      />
    </>
  );
};

export default UserNavbar;
