"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ChevronDown, LayoutList, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

const COUNTRIES =  [
  { name: "Bangladesh", value: "bangladesh" },
  { name: "Pakistan", value: "pakistan" },
  { name: "India", value: "india" },
  { name: "United States", value: "usa" },
  { name: "United Kingdom", value: "uk" },
  { name: "Germany", value: "germany" },
  { name: "France", value: "france" },
  { name: "Canada", value: "canada" },
  { name: "Australia", value: "australia" },
  { name: "Japan", value: "japan" },
  { name: "China", value: "china" },
  { name: "Russia", value: "russia" },
  { name: "Brazil", value: "brazil" },
  { name: "Mexico", value: "mexico" },
  { name: "Italy", value: "italy" },
  { name: "Spain", value: "spain" },
  { name: "South Korea", value: "south-korea" },
  { name: "Saudi Arabia", value: "saudi-arabia" },
  { name: "UAE", value: "uae" },
  { name: "Singapore", value: "singapore" },
  { name: "Malaysia", value: "malaysia" },
  { name: "Thailand", value: "thailand" },
  { name: "Vietnam", value: "vietnam" },
  { name: "Philippines", value: "philippines" },
  { name: "Indonesia", value: "indonesia" },
  { name: "Sri Lanka", value: "sri-lanka" },
  { name: "Nepal", value: "nepal" },
  { name: "Bhutan", value: "bhutan" },
  { name: "Maldives", value: "maldives" },
  { name: "Egypt", value: "egypt" },
  { name: "South Africa", value: "south-africa" },
  { name: "Nigeria", value: "nigeria" },
  { name: "Kenya", value: "kenya" },
  { name: "Ethiopia", value: "ethiopia" },
  { name: "Ghana", value: "ghana" },
  { name: "Morocco", value: "morocco" },
  { name: "Algeria", value: "algeria" },
  { name: "Tunisia", value: "tunisia" },
];

const Navitems = () => {
  const currentActive = usePathname();
  const route = useRouter();


  const handleCategory = (category: string) => {
    route.push(`/shop?productType=${category}`);
  };
  const handleCountry = (country: string) => {
    route.push(`/shop?country=${country}`);
  };
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-start lg:gap-20 py-4 w-full">
          {/* Left side - Category & Country Selectors */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Category Selector */}
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Category Selector */}
              <div className="relative w-full lg:w-auto">
                <Select onValueChange={handleCategory}>
                  <SelectTrigger className="bg-primary text-white hover:bg-primary/90 w-full lg:w-[240px] h-12 lg:h-10 transition-colors">
                    <div className="flex items-center gap-2">
                      <LayoutList className="text-white" size={18} />
                      <SelectValue
                        placeholder={
                          <span className="font-medium text-white">
                            Browse All Category
                          </span>
                        }
                      />
                      <ChevronDown className="text-white" size={18} />
                    </div>
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-w-[300px] md:max-w-[300px] mt-2 lg:max-w-[400px]">
                    <SelectGroup>
                      <SelectLabel className="text-lg font-semibold px-4 py-2">
                        All Categories
                      </SelectLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3  ">
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
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Country Selector */}
              <div className="w-full lg:w-auto">
                <Select onValueChange={handleCountry}>
                  <SelectTrigger className="border-gray-200 hover:border-primary/50 transition-all w-full lg:w-[200px] h-12 lg:h-10 bg-white">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-primary" />
                      <SelectValue placeholder="Select Country" />
                    </div>
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-[400px] w-[300px] md:w-[450px] lg:w-[600px] overflow-y-auto mt-2 bg-white border-gray-100 shadow-xl rounded-xl p-2">
                    <SelectGroup>
                      <SelectLabel className="text-gray-400 text-xs font-bold uppercase tracking-wider px-3 py-2">
                        Select Country
                      </SelectLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        {COUNTRIES.map((item, index) => (
                          <SelectItem 
                            key={index} 
                            value={item.value} 
                            className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-primary/5 hover:text-primary transition-colors focus:bg-primary/5 focus:text-primary border-none outline-none"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-data-[state=checked]:bg-primary" />
                              <span className="truncate font-medium">{item.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right side - Navigation Links */}
          <nav className="hidden md:flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto mt-4 lg:mt-0">
            {NAV_ITEMS.map((item, index) => {
              const isActive = currentActive === item.link;
              return (
                <Link
                  href={item.link}
                  key={index}
                  className={`relative font-medium transition-colors group py-2 lg:py-0 ${
                    isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 hidden lg:block ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navitems;
