import Image from "next/image";
import React from "react";

type Country = {
  img: string;
  name: string;
};

const CountryCard = ({ data }: { data: Country }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Circle Image */}
      <div className="relative w-[150px] h-[150px] rounded-full border overflow-hidden bg-white">
        <Image
          src={data.img}
          alt={data.name}
          fill
          className="object-contain p-6"
          sizes="150px"
        />
      </div>

      {/* Text */}
      <p className="mt-3 text-sm font-medium">{data.name}</p>
    </div>
  );
};

export default CountryCard;
