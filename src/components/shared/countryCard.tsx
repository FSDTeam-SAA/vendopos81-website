import Image from "next/image";
import React from "react";

import Link from "next/link";

type Country = {
  img: string;
  name: string;
};

const CountryCard = ({ data }: { data: Country }) => {
  return (
    <Link href={`/shop?country=${data.name}`} className="flex flex-col items-center text-center group">
      {/* Circle Image */}
      <div className="relative w-[150px] h-[150px] rounded-full border overflow-hidden bg-white transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
        <Image
          src={data.img}
          alt={data.name}
          fill
          className="object-contain p-6"
          sizes="150px"
        />
      </div>

      {/* Text */}
      <p className="mt-3 text-sm font-medium group-hover:text-primary transition-colors">{data.name}</p>
    </Link>
  );
};

export default CountryCard;
