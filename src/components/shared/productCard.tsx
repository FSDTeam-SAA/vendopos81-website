import { useSmartAddToCart } from "@/lib/hooks/cart";
import { useAddedWishlist } from "@/lib/hooks/wishlist";
import { Product } from "@/lib/types/product";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, StarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import AuthModal from "./AuthModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { mutate } = useAddedWishlist();
  const { smartAddToCart } = useSmartAddToCart();
  const { status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const productImage =
    product.images?.[0]?.url || "/images/placeholder-product.png";

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
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
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

    if (status !== "authenticated") {
      setShowAuthModal(true);
      return;
    }

    mutate(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "authenticated") {
      setShowAuthModal(true);
      return;
    }

    smartAddToCart(product);
  };

  return (
    <>
      <Link href={`/shop/${product._id}`} className="block w-full">
        <div className="group relative w-full mx-auto overflow-hidden rounded-2xl border bg-[#ffffff] p-4  transition-all duration-300">
          {product.showOnlyDiscount > 0 && (
            <button className="absolute left-0 top-0 rounded-tl-2xl rounded-r-2xl bg-primary px-5 py-2 text-white text-[14px] z-10">
              {product.showOnlyDiscount}%
            </button>
          )}

          {/* Wishlist */}
          <Button
            onClick={(e) => handleWishlist(e, product._id)}
            title="add to wishlist"
            className="absolute -top-28 right-5 group-hover:top-3 z-20 rounded-full duration-700 transform ease-in-out transition-all opacity-0 group-hover:opacity-100 bg-white hover:bg-white text-primary shadow-md border hover:border-primary"
            size="icon"
          >
            <Heart className="w-6 h-6" />
          </Button>

          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.2 }} // increased from 1.05 to 1.1
            transition={{ duration: 0.3, ease: "easeOut" }} // slightly longer for smoother effect
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
              {product.productName}
            </span>

            <h3 className="lg:text-xl  mt-2 md:text-base font-bold text-[#253D4E] line-clamp-2 min-h-[2.5rem] leading-tight">
              {product.title || product.productName}
            </h3>

            <div className="flex items-center gap-1">
              <div className="flex text-[20px]">{renderStars()}</div>
              <span className="ml-1 text-lg text-gray-500">{totalRatings}</span>
            </div>

            {/* Price + Add to Cart */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                {product?.discountPriceFrom && product.discountPriceFrom > 0 ? (
                  <>
                    <h4 className="text-xl sm:text-2xl font-bold text-primary underline">
                      ${product.discountPriceFrom}
                    </h4>
                    <h5 className="text-[15px] sm:text-[17px] font-medium text-[#ADADAD] line-through">
                      ${product.priceFrom}
                    </h5>
                  </>
                ) : product?.priceFrom && product.priceFrom > 0 ? (
                  <h4 className="text-xl sm:text-2xl font-bold text-primary underline">
                    ${product.priceFrom}
                  </h4>
                ) : null}
              </div>

              <Button
                onClick={handleAddToCart}
                title="add to cart"
                className="flex items-center w-full md:w-auto gap-2 rounded-md bg-[#DEF9EC] px-3 py-2 text-sm sm:text-base font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 border-none "
              >
                <ShoppingCart size={22} />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default ProductCard;
