import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={60}
                height={58}
                className="object-contain"
              />
            </Link>
            <p className="text-secondary font-normal text-lg leading-7">
              Awesome grocery store website template
            </p>

            <div className="flex gap-2 items-center">
              <h3 className="font-bold leading-4 text-secondary text-base">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <Button
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white h-7.5 w-7.5"
                >
                  <FaFacebookF className="h-3.4 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white h-7.5 w-7.5"
                >
                  <FaTwitter className="h-3.4 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white h-7.5 w-7.5"
                >
                  <FaInstagram className="h-3.4 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white h-7.5 w-7.5"
                >
                  <FaYoutube className="h-3.4 w-3.5" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Up to 15% discount on your first subscribe
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-xl text-secondary mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="font-bold text-xl text-secondary mb-6">Account</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  View Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Column */}
          <div>
            <h3 className="font-bold text-xl text-secondary mb-6">Corporate</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/vendor"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link
                  href="/supplier"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Became a Supplier
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 Logoipsum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
