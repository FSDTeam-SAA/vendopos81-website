import MostCatagoryCard from "@/components/sheard/MostCatagoryCard";
import React from "react";

const CaseDeals = () => {
  const data = [
    {
      image: "/images/weekly1.jpg",
      tittle: "Angie's sweets & salty kettle",
      rating: "40",
      price: "22",
    },
    {
      image: "/images/weekly2.jpg",
      tittle: "Angie's sweets & salty kettle",
      rating: "40",
      price: "22",
    },
    {
      image: "/images/weekly3.jpg",
      tittle: "Angie's sweets & salty kettle",
      rating: "40",
      price: "22",
    },
  ];
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-secondary font-bold text-lg md:text-2xl leading-7.5 border-b pb-5">
        Case Deals
        </h1>
        <p className=" border-b  w-20 h-1 bg-[#BCE3C9] "></p>
      </div>

      <div className="space-y-4  sm:space-y-5 lg:space-x-7">
        {data.map((item, index) => (
          <MostCatagoryCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CaseDeals;
