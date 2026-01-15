import React from "react";

const TopHeader = () => {
  return (
    <section>
      <div className="container hidden md:block mx-auto   md:px-5 py-2.5 text-center md:text-start">
        <div className="flex  items-center justify-between w-full">

        <h5 className="text-primary font-lato font-bold text-sm leading-2.5 m-0 p-0">
          100% Secure delivery without contacting the courier
        </h5>
        <p className="flex gap-2 text-center text-sm font-bold justify-center md:justify-end items-center whitespace-nowrap m-0 p-0">
          Need help? Call Us:
          <span className="text-primary font-lato font-bold whitespace-nowrap">
            +1800900122
          </span>
        </p>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;