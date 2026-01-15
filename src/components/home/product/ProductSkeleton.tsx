import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Image */}
      <div className="h-40 w-full rounded-xl bg-gray-200 mb-4" />

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-4 rounded bg-gray-200"
          />
        ))}
      </div>

      {/* Price */}
      <div className="h-5 w-24 bg-gray-200 rounded mb-4" />

      {/* Button */}
      <div className="h-10 w-full rounded-full bg-gray-200" />
    </div>
  );
};

export default ProductSkeleton;
