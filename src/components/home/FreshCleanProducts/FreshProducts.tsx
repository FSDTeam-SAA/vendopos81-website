import FreshCleanProducts from "@/components/sheard/FreshCleanProducts";
import React from "react";

const FreshProducts = () => {
  const data = [
    {
      image: "/images/fresh-product1.jpg",
      tittle: "Everyday Fresh & Clean with Our Products",
      bgColor: "bg-[#F0E8D5]",
    },
    {
      image: "/images/fresh-product2.jpg",
      tittle: "Make your Breakfast Healthy and Easy",
      bgColor: "bg-[#F3E8E8]",
    },
    {
      image: "/images/fresh-product3.jpg",
      tittle: "The best Organic Products Online",
      bgColor: "bg-[#E7EAF3]",
    },
  ];

  return (
    <section className="my-10 md:my-16 lg:my-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <FreshCleanProducts key={index} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshProducts;