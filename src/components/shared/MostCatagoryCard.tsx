import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

import Link from "next/link";

interface data {
  image: string;
  tittle: string;
  rating: string;
  price: string;
}

const MostCatagoryCard = ({ data }: { data: data }) => {
  return (
    <Link href={`/shop?productType=${data.tittle}`} className="flex items-center gap-3 sm:gap-4 group">
      {/* IMAGE */}
      <div className="flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={data.image}
          alt={data.tittle}
          width={100}
          height={100}
          className="sm:w-[120px] sm:h-[120px] transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-secondary mb-2 leading-5 group-hover:text-primary transition-colors">
          {data.tittle}
        </h2>

        <div className="flex items-center gap-1 text-lg text-yellow-500 mb-2">
          <div className="flex items-center gap-2">
            <FaStar className=" text-yellow-500" />
            <FaStar className=" text-yellow-500 text-lg!" />
            <FaStar className=" text-yellow-500" />
            <FaStar className=" text-yellow-500" />
            <FaStar className=" text-yellow-500" />
          </div>
          <span className="ml-1 text-gray-400">{data.rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="text-base sm:text-lg font-bold text-primary">
            ${data.price}
          </h4>
          <p className="text-xs sm:text-sm text-gray-400 line-through">
            ${data.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MostCatagoryCard;
