import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types/category";

const CountryCard = ({ data }: { data: Category }) => {
  const imageUrl = data.regionImage?.url || data.productImage.url;

  return (
    <Link
      href={`/shop?country=${data.region}`}
      className="flex flex-col items-center text-center group"
    >
      {/* Circle Image */}
      <div className="relative w-[150px] h-[150px] rounded-full border overflow-hidden bg-white transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
        <Image
          src={imageUrl}
          alt={data.region}
          fill
          className="object-contain p-6"
          sizes="150px"
        />
      </div>

      {/* Text */}
      <p className="mt-3 text-sm font-medium group-hover:text-primary transition-colors">
        {data.region}
      </p>
    </Link>
  );
};

export default CountryCard;
