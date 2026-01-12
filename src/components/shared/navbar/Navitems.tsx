"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutList, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const CATEGORIES = [
  { name: "Fruits & Vegetables", value: "fruits-vegetables" },
  { name: "Dairy & Eggs", value: "dairy-eggs" },
  { name: "Meat & Fish", value: "meat-fish" },
  { name: "Beverages", value: "beverages" },
  { name: "Snacks", value: "snacks" },
  { name: "Bakery", value: "bakery" },
  { name: "Home & Cleaning", value: "home-cleaning" },
];

const COUNTRIES = [
  { name: "Bangladesh", value: "bangladesh" },
  { name: "Pakistan", value: "pakistan" },
  { name: "India", value: "india" },
  { name: "United States", value: "usa" },
  { name: "UK", value: "uk" },
];

const Navitems = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-start lg:gap-20 py-4 w-full">
          {/* Left side - Category & Country Selectors */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Category Selector */}
            <div className="relative w-full lg:w-auto">
              <Select>
                <SelectTrigger className="bg-primary text-white hover:bg-primary/90 w-full lg:min-w-55 h-12 lg:h-10 transition-colors">
                  <SelectValue>
                    <div className="flex items-center gap-2 text-white">
                      <LayoutList size={18} />
                      <span className="font-medium">Browse All Category</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-[300px]">
                  <SelectGroup>
                    <SelectLabel className="text-lg font-semibold px-4 py-2">
                      All Categories
                    </SelectLabel>
                    {CATEGORIES.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.value}
                        className="py-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{item.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Country Selector */}
            <div className="w-full lg:w-auto">
              <Select>
                <SelectTrigger className="border w-full lg:min-w-[160px] h-12 lg:h-10">
                  <SelectValue>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} />
                      <span>Country</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Country</SelectLabel>
                    {COUNTRIES.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right side - Navigation Links */}
          <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto mt-4 lg:mt-0">
            {NAV_ITEMS.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="relative text-gray-700 hover:text-primary font-medium transition-colors group py-2 lg:py-0"
                
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full hidden lg:block" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navitems;