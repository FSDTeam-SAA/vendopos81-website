import Image from "next/image";
import React from "react";
import { Heart, ShoppingCart, Star, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/lib/types/product";
import { motion } from "framer-motion";
import { useAddedWishlist } from "@/lib/hooks/wishlist";
import { useSmartAddToCart } from "@/lib/hooks/cart";
import Link from "next/link";

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

  const handleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    mutate(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    smartAddToCart(product);
  };

  // Improved price logic
  const displayPrice = (() => {
    if (product.wholesaleId && product.wholesaleId.length > 0) {
      const wholesale = product.wholesaleId[0];
      if (wholesale.type === "pallet" && wholesale.palletItems?.[0]) {
        return wholesale.palletItems[0].price;
      }
      if (wholesale.type === "case" && wholesale.caseItems?.[0]) {
        return wholesale.caseItems[0].price;
      }
    }
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].price;
    }
    return product.priceFrom || 0;
  })();

  const originalPrice = displayPrice ? displayPrice + 2 : 0;

  return (
    <Link href={`/shop/${product._id}`} className="block w-full">
      <div className="group relative w-full mx-auto overflow-hidden rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Badges */}
        {product.productType === "Organic" && (
          <span className="absolute left-0 top-0 z-10 rounded-r-2xl rounded-tl-2xl bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            Organic
          </span>
        )}

        <button className="absolute left-0 top-0 rounded-tl-2xl rounded-r-2xl bg-primary px-3 py-1 text-white text-xs z-10">
          13%
        </button>

        {/* Wishlist */}
        <Button
          onClick={(e) => handleWishlist(e, product._id)}
          className="absolute -top-28 right-5 group-hover:top-3 z-20 rounded-full duration-700 transform ease-in-out transition-all opacity-0 group-hover:opacity-100 bg-white hover:bg-white text-primary shadow-md border hover:border-primary"
          size="icon"
        >
          <Heart className="w-5 h-5" />
        </Button>

        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative mx-auto mt-8 h-48 w-full overflow-hidden rounded-lg"
        >
          <Image
            src={productImage}
            alt={product.title || product.productName}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <span className="text-xs text-[#ADADAD] tracking-wide font-medium">
            {categoryName}
          </span>

          <h3 className="text-sm md:text-base font-bold text-[#253D4E] line-clamp-2 min-h-[2.5rem] leading-tight">
            {product.title || product.productName}
          </h3>

          <div className="flex items-center gap-1">
            <div className="flex">{renderStars()}</div>
            <span className="ml-1 text-xs text-gray-500">
              ({totalRatings})
            </span>
          </div>

          <p className="text-xs text-gray-500">
            By <span className="font-medium text-green-600">{brandName}</span>
          </p>

          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h4 className="text-lg font-bold text-primary">
                ${displayPrice || "N/A"}
              </h4>
              {displayPrice && (
                <h5 className="text-sm font-medium text-[#ADADAD] line-through">
                  ${originalPrice}
                </h5>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex items-center gap-1 rounded-lg bg-[#DEF9EC] px-3 py-1.5 text-xs md:text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors border-none shadow-none"
            >
              <ShoppingCart size={14} />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
