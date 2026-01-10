import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "@/lib/types/product";

interface WishlistCardProps {
  data: Product | { productId: Product; [key: string]: any }; 
}

const WishlistCard = ({ data }: WishlistCardProps) => {
  // Determine if data is the product itself or a wrapper
  const product = 'productId' in data ? (data as { productId: Product }).productId : (data as Product); 

  // Safely access properties
  const title = product?.title || product?.productName || "Product Name";
  const image = product?.images?.[0]?.url || "/images/placeholder.jpg";
  const price = product?.variants?.[0]?.price || product?.priceFrom || 0;
  const originalPrice = product?.variants?.[0]?.discountPrice 
    ? product?.variants?.[0]?.price 
    : (product?.priceFrom ? product.priceFrom * 1.2 : 0); // Mock original price calculation if not available

  const brand = product?.supplierId?.brandName || "Brand";
  const rating = product?.averageRating || 0;
  const weight = product?.variants?.[0]?.unit || "500g";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 border rounded-2xl hover:shadow-md transition-shadow">
      <div className="relative w-full sm:w-[150px] h-[150px] shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded-xl"
        />
      </div>
      
      <div className="flex-1 w-full text-center sm:text-left">
        <h5 className="text-sm text-gray-500 font-medium mb-1">{brand}</h5>
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h2>
        
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-3 text-sm text-gray-600">
          <p className="flex items-center gap-1">
            <span className="text-yellow-400">★</span> 
            <span>({rating.toFixed(1)})</span>
          </p>
          <p className="border-l pl-4 border-gray-300">{weight}</p>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 hidden sm:block">
          {product?.shortDescription || "No description available."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-bold text-green-600">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </h4>
            {originalPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : originalPrice}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              className="flex-1 sm:flex-none flex items-center gap-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              onClick={() => {}} // Add to cart functionality
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              onClick={() => {}} // Remove from wishlist
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
