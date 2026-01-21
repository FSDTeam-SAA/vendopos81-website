import React from "react";

const Skeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="w-full h-96 bg-gray-200 rounded-lg" />

        {/* Product info */}
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-5 w-1/4 bg-gray-200 rounded" />

          <div className="space-y-2 pt-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

          <div className="h-10 w-40 bg-gray-200 rounded-md mt-6" />
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-12 space-y-6">
        <div className="h-5 w-48 bg-gray-200 rounded" />

        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
