import React from "react";

const MostCatagorySkeleton = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full animate-pulse">
      {/* IMAGE SKELETON */}
      <div className="flex-shrink-0 rounded-lg bg-gray-200 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]" />

      {/* CONTENT */}
      <div className="flex-1 space-y-3">
        {/* TITLE */}
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2" />

        {/* RATING */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 bg-gray-200 rounded"
            />
          ))}
          <div className="h-3 w-10 bg-gray-200 rounded ml-2" />
        </div>

        {/* PRICE */}
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
};

export default MostCatagorySkeleton;
