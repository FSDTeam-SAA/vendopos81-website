import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

import Link from "next/link";
import { TopRatedProduct } from "@/lib/types/mostcatagory";

const MostCatagoryCard = ({ data }: { data: TopRatedProduct }) => {
  const imageUrl = data?.images?.[0]?.url || "/images/placeholder.jpg";

  return (
    <Link
      href={`/shop/${data._id}`}
      className="flex items-center gap-3 sm:gap-4 group w-full"
    >
      {/* IMAGE */}
      <div className="flex-shrink-0 overflow-hidden rounded-lg w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] relative">
        <Image
          src={imageUrl}
          alt={data.title || "Product Image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <h2 className="text-sm sm:text-base font-bold text-secondary mb-2 leading-5 group-hover:text-primary transition-colors line-clamp-2">
          {data.title}
        </h2>

        <div className="flex items-center gap-1 text-yellow-500 mb-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(data.averageRating || 0)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="ml-1 text-xs sm:text-sm text-gray-400">
            ({data.averageRating || 0})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="text-base sm:text-lg font-bold text-primary">
            ${data.priceFrom}
          </h4>
          {/* If there's a discount, we'd show it here. For now just repeating as per original design or showing nothing */}
          {/* <p className="text-xs sm:text-sm text-gray-400 line-through">
            ${data.priceFrom}
          </p> */}
        </div>
      </div>
    </Link>
  );
};

export default MostCatagoryCard;
