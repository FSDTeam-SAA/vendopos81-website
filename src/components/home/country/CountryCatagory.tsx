import CountryCard from "@/components/sheard/countryCard";
import React from "react";

const CountryList = () => {
  const data = [
    { id: 1, name: "Food", img: "/images/country1.png" },
    { id: 2, name: "Electric", img: "/images/country1.png" },
    { id: 3, name: "Electric", img: "/images/country1.png" },
    { id: 4, name: "Electric", img: "/images/country1.png" },
    { id: 5, name: "Electric", img: "/images/country1.png" },
    { id: 6, name: "Electric", img: "/images/country1.png" },
    { id: 7, name: "Electric", img: "/images/country1.png" },
  ];

  return (
    <section className="overflow-hidden py-6">
      <div className="relative w-full">
        {/* Slider track */}
        <div className="flex w-max gap-8 animate-marquee">
          {[...data, ...data].map((item, index) => (
            <CountryCard key={index} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryList;
