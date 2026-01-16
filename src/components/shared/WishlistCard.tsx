import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "@/lib/types/product";
import Link from "next/link";
import { motion } from "framer-motion"; // ✅ added

interface WishlistCardProps {
  data: Product | { productId: Product; [key: string]: unknown };
  onAddToCart: (product: Product) => void;
  onRemove: (productId: string) => void;
}

const WishlistCard = ({ data, onAddToCart, onRemove }: WishlistCardProps) => {
  const product =
    "productId" in data
      ? (data as { productId: Product }).productId
      : (data as Product);

  const productId = product?._id || "";
  const title = product?.title || product?.productName || "Product Name";
  const image = product?.images?.[0]?.url || "/images/placeholder.jpg";
  const price = product?.variants?.[0]?.price || product?.priceFrom || 0;
  const originalPrice = product?.variants?.[0]?.discountPrice
    ? product?.variants?.[0]?.price
    : product?.priceFrom
    ? product.priceFrom * 1.2
    : 0;
  const brand = (typeof product?.supplierId === 'object' && product?.supplierId?.brandName) 
    ? product.supplierId.brandName 
    : "Brand";
  const rating = product?.averageRating || 0;
  const weight = product?.variants?.[0]?.unit || "500g";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(productId);
  };

  const productDetailUrl = `/product/${productId}`;

  return (
    <Link href={productDetailUrl} className="bg-white ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center gap-5 relative rounded-2xl bg-white hover:shadow-md transition-shadow"
      >
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-4 rounded-md border"
        >
          <Image
            src={image}
            alt={title}
            width={300}
            height={100}
            className="object-cover rounded-xl w-50 aspect-square"
          />
        </motion.div>
        <button className="px-3 py-1 mt-1.5 bg-primary absolute left-0 top-0 text-white rounded-tl-2xl rounded-r-3xl">
          13%
        </button>

        {/* Details */}
        <div className="flex-1 w-full pr-4 py-4">
          <div className="flex justify-between items-center">
            <h5 className="text-sm text-gray-500 font-medium mb-1">{brand}</h5>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-[#4A5565] border-gray-300 hover:bg-primary hover:text-green-100 hover:border-white"
                onClick={handleRemove}
              >
                <Trash2 size={18} />
              </Button>
            </motion.div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h2>

          <div className="flex items-center justify-center sm:justify-start gap-4 mb-3 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>({rating.toFixed(1)})</span>
            </p>
            <p className="border-l pl-4 border-gray-300">{weight}</p>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 hidden sm:block mb-4">
            {product?.shortDescription || "No description available."}
          </p>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-5">
              <h4 className="text-xl font-bold text-green-600">
                ${typeof price === "number" ? price.toFixed(2) : price}
              </h4>
              {originalPrice > price && (
                <p className="text-sm text-gray-400 line-through">
                  $
                  {typeof originalPrice === "number"
                    ? originalPrice.toFixed(2)
                    : originalPrice}
                </p>
              )}
            </div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                className="flex items-center gap-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default WishlistCard;
