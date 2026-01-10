import Image from "next/image";
import React from "react";
import { ShoppingCart, Star, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Get the first image or use a fallback
  const productImage = product.images?.[0]?.url || "/images/placeholder-product.png";
  const categoryName = product.categoryId?.slug || "Product";
  const brandName = product.supplierId?.brandName || "Brand";
  const rating = product.averageRating || 0;
  const totalRatings = product.totalRatings || 0;
  
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="group relative w-full max-w-[260px] mx-auto rounded-2xl border bg-white p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      
      {/* Discount badge - make dynamic if you have discount data */}
      {product.productType === "Organic" && (
        <span className="absolute left-0 top-0 z-10 rounded-r-2xl rounded-tl-2xl bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          Organic
        </span>
      )}

      {/* Product image */}
      <div className="relative mx-auto h-[220px] w-full overflow-hidden rounded-lg">
        <Image
          src={productImage}
          alt={product.title || product.productName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 260px) 100vw, 260px"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {categoryName}
        </span>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
          {product.title || product.productName}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">{renderStars()}</div>
          <span className="ml-2 text-xs text-gray-500">
            ({totalRatings})
          </span>
        </div>

        <p className="text-xs text-gray-500">
          By <span className="font-medium text-green-600">{brandName}</span>
        </p>

        {/* Short description */}
        {product.shortDescription && (
          <p className="text-xs text-gray-400 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price + Button - Update with actual price data when available */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-green-600">${product?.wholesaleId?.[0]?.palletItems?.[0].price}</h4>
            <p className="text-sm text-gray-400 line-through">$32.80</p>
          </div>

          <Button 
            className="flex items-center gap-1 rounded-lg bg-primary/30 px-3 py-1.5 text-sm text-primary font-bold hover:bg-primary/40 transition-colors"
            onClick={() => console.log("Add to cart:", product._id)}
          >
            <ShoppingCart size={14} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;