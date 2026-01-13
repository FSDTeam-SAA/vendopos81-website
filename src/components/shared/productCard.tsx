import Image from "next/image";
import React from "react";
import { ShoppingCart, Star, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/lib/types/product";
import { motion } from "framer-motion"; // ✅ add

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productImage =
    product.images?.[0]?.url || "/images/placeholder-product.png";

  const categoryName = product.categoryId?.slug || "Product";
  const brandName = product.supplierId?.brandName || "Brand";
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
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // 👈 fade + slide in
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }} // 👈 hover lift
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative w-full max-w-[260px] mx-auto rounded-2xl border bg-white p-4 shadow-sm hover:shadow-lg"
    >
      {product.productType === "Organic" && (
        <span className="absolute left-0 top-0 z-10 rounded-r-2xl rounded-tl-2xl bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          Organic
        </span>
      )}

      <button className="px-3 py-1 bg-primary absolute left-0 top-0 text-white rounded-tl-2xl rounded-r-2xl">
        13%
      </button>

      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.05 }} // 👈 smooth zoom
        transition={{ duration: 0.3 }}
        className="relative mx-auto h-[220px] w-full mt-8 overflow-hidden rounded-lg"
      >
        <Image
          src={productImage}
          alt={product.title || product.productName}
          fill
          className="object-cover"
          sizes="(max-width: 260px) 100vw, 260px"
        />
      </motion.div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {categoryName}
        </span>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
          {product.title || product.productName}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex">{renderStars()}</div>
          <span className="ml-2 text-xs text-gray-500">({totalRatings})</span>
        </div>

        <p className="text-xs text-gray-500">
          By <span className="font-medium text-green-600">{brandName}</span>
        </p>

        {product.shortDescription && (
          <p className="text-xs text-gray-400 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <h4 className="text-lg font-bold text-green-600">
            ${product?.wholesaleId?.[0]?.palletItems?.[0]?.price}
          </h4>

          <Button className="flex items-center gap-1 rounded-lg bg-primary/30 px-3 py-1.5 text-sm text-primary font-bold hover:bg-primary/40">
            <ShoppingCart size={14} />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
