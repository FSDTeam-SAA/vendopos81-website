import Image from "next/image";
import React from "react";
import { ShoppingCart } from "lucide-react"; // optional icon
import { Button } from "../ui/button";

const ProductCard = () => {
  return (
    <div className="relative w-[260px] rounded-2xl border bg-white p-4 shadow-sm">
      
      {/* Discount badge */}
      <span className="absolute left-0 top-0 rounded-r-2xl rounded-tl-2xl bg-green-600 px-3 py-1 text-xs font-semibold text-white">
        13%
      </span>

      {/* Product image */}
      <div className="relative mx-auto h-[220px] w-[220px]">
        <Image
          src="/images/product.png"
          alt="product"
          fill
          className="object-contain"
          sizes="220px"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-1">
        <span className="text-xs text-gray-400">Fresh Fruit</span>

        <h3 className="text-sm font-semibold text-gray-800">
          Seeds of Changes Organic Red Rice
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-yellow-500">
          ★★★★★ <span className="ml-1 text-gray-400">(98)</span>
        </div>

        <p className="text-xs text-gray-400">
          By <span className="text-green-600">Vendopos</span>
        </p>

        {/* Price + Button */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-green-600">$28.85</h4>
            <p className="text-sm text-gray-400 line-through">$32.80</p>
          </div>

          <Button className="flex items-center gap-1 rounded-lg bg-primary/30 px-3 py-1.5 text-sm  text-primary font-bold cursor-pointer ">
            <ShoppingCart size={14} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
