import Image from "next/image";
import React from "react";
import { Heart, ShoppingCart, Star, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/lib/types/product";
import { motion } from "framer-motion";
import { useAddedWishlist } from "@/lib/hooks/wishlist";
import { useSmartAddToCart } from "@/lib/hooks/cart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { mutate } = useAddedWishlist();
  const { smartAddToCart } = useSmartAddToCart();

  const productImage =
    product.images?.[0]?.url || "/images/placeholder-product.png";

  const categoryName = product.categoryId?.slug || "Product";
  const brandName = (typeof product.supplierId === 'object' && product.supplierId?.brandName)
    ? product.supplierId.brandName
    : "Brand";
  const rating = product.averageRating || 0;
  const totalRatings = product.totalRatings || 0;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleWishlist = (id: string) => {
    mutate(id);
  };

  const handleAddToCart = () => {
    smartAddToCart(product);
  };

  return (
    <div className="group relative w-full max-w-[260px] mx-auto overflow-hidden rounded-2xl border bg-white p-4 shadow-sm hover:shadow-sm transition-shadow">
      {/* Badges */}
      {product.productType === "Organic" && (
        <span className="absolute left-0 top-0 z-10 rounded-r-2xl rounded-tl-2xl bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          Organic
        </span>
      )}

      <button className="absolute left-0 top-0 rounded-tl-2xl rounded-r-2xl bg-primary px-3 py-1 text-white text-xs">
        13%
      </button>

      {/* Wishlist */}
      <Button
        onClick={() => handleWishlist(product._id)}
        className="absolute -top-28 right-5 group-hover:top-3 z-20 rounded-full duration-700 transform ease-in-out transition-all opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart />
      </Button>

      {/* Image (ONLY animation here) */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative mx-auto mt-8 h-50 w-full overflow-hidden rounded-lg"
      >
        <Image
          src={productImage}
          alt={product.title || product.productName}
          fill
          className="object-cover"
          sizes="(max-width: 200px) 100vw, 200px"
        />
      </motion.div>

      {/* Content */}
      <div className="mt-3 space-y-2">
        <span className="text-sm text-[#ADADAD] tracking-wide">
          {categoryName}
        </span>

        <h3 className="text-sm md:text-lg font-bold text-[#253D4E] line-clamp-2">
          {product.title || product.productName}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex">{renderStars()}</div>
          <span className="ml-2 text-xs text-gray-500">
            ({totalRatings})
          </span>
        </div>

        <p className="text-xs text-gray-500">
          By <span className="font-medium text-green-600">{brandName}</span>
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-primary">
              ${product?.wholesaleId?.[0]?.palletItems?.[0]?.price || "N/A"}
            </h4>
            <h5 className="text-base font-medium text-[#ADADAD] line-through">
              ${(product?.wholesaleId?.[0]?.palletItems?.[0]?.price || 0) - 2}
            </h5>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="flex items-center gap-1 rounded-lg bg-[#DEF9EC] px-3 py-1.5 text-sm font-bold text-primary hover:bg-primary/40"
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
