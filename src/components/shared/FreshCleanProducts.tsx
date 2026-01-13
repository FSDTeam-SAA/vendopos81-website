import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { MoveRightIcon } from "lucide-react";

interface Data {
  image: string;
  tittle: string;
  bgColor: string;
}

const FreshCleanProducts = ({ data }: { data: Data }) => {
  return (
    <div
      className={`relative w-full 
      h-[220px] sm:h-[260px] md:h-[280px] lg:h-[302px] 
      rounded-lg overflow-hidden group`}
    >
      <div className="flex h-full w-full">
        {/* TEXT */}
        <div
          className=" w-1/2 md:w-[60%] flex flex-col justify-center 
          pl-4 sm:pl-6 md:pl-10 
          pr-2 z-10"
        >
          <h2
            className="
            text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-secondary
            mb-6 md:mb-10 
            leading-[1.2]"
          >
            {data.tittle}
          </h2>

          <Button
            className=" w-fit bg-[#3BB77E] hover:bg-[#2add89]
            text-white rounded-sm 
            px-4 sm:px-5 md:px-6"
          >
            Shop Now
            <MoveRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* IMAGE */}
        <div className="absolute inset-0 right-0 h-full">
          <Image
            src={data.image}
            alt={data.tittle}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 768px) 60vw,
              33vw
            "
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FreshCleanProducts;
