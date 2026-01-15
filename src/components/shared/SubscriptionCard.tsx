import { Search } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface SubscriptionCardInterface {
  tittle: string;
  dis: string;
  image: string;
}

const SubscriptionCard = ({ data }: { data: SubscriptionCardInterface }) => {

  
  return (
    <div className="relative h-70 sm:h-80 md:h-[30vh] lg:h-[40vh] overflow-hidden rounded-lg">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 right-0">
        <Image
          src={data.image}
          alt={data.tittle}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 md:max-w-10/12">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold text-primary mb-2">
          {data.tittle}
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-xl">
          {data.dis}
        </p>

        <div className="">
          <div className="flex items-center bg-white rounded-full shadow-lg p-1 max-w-full sm:max-w-xl">
            
         

            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 outline-none rounded-l-full text-sm sm:text-base"
            />

            <Button className="rounded-full cursor-pointer px-2 sm:px-8 py-3 sm:py-6 bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
