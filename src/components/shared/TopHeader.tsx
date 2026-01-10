import React from "react";

const TopHeader = () => {
  return (
    <section>
      <div className="container hidden md:block mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-0 justify-between items-center py-2.5 text-center md:text-start">
        <h5 className="text-primary font-lato font-bold text-sm leading-2.5">
          100% Secure delivery without contacting the courier
        </h5>
        <p className="flex gap-2 text-center text-sm font-bold justify-center md:justify-end">
          Need help? Call Us:
          <span className="text-primary font-lato font-bold">+1800900122</span>
        </p>
      </div>
    </section>
  );
};

export default TopHeader;
