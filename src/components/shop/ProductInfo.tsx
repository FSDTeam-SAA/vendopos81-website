"use client";

import React, { useState } from "react";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Clock, 
  Package, 
  Check, 
  Info,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAddToCart } from "@/lib/hooks/cart";
import { useAddedWishlist } from "@/lib/hooks/wishlist";
import { Product, WholesaleItem } from "@/lib/types/product";
import { toast } from "sonner";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToWishlist } = useAddedWishlist();
  
  // -- STATE --
  const [selectedWholesale, setSelectedWholesale] = useState<WholesaleItem | null>(
    product.wholesaleId?.[0] || null
  );
  const [quantity, setQuantity] = useState<number>(1);

  // -- HELPERS --
  const getWholesalePrice = (item: WholesaleItem | null): number => {
    if (!item) return 0;
    if (item.type === "pallet" && item.palletItems?.[0]) {
      return item.palletItems[0].price || 0;
    }
    if (item.type === "case" && item.caseItems?.[0]) {
      return item.caseItems[0].price || 0;
    }
    return 0;
  };

  const getRegularPrice = () => {
    // Fallback if no wholesale selected (e.g. single item product if that exists later)
    return product.priceFrom || 0;
  };

  const currentPrice = selectedWholesale 
    ? getWholesalePrice(selectedWholesale) 
    : getRegularPrice();

  const isAvailable = product.isAvailable ?? false;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product._id) return;

    if (selectedWholesale) {
        addToCart({
            productId: product._id,
            wholesaleId: selectedWholesale._id,
            quantity: quantity
        });
    } else {
        // Fallback for generic products
         addToCart({
            productId: product._id,
            quantity: quantity
        });
    }
  };

  const handleWishlist = () => {
      if(product._id) addToWishlist(product._id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-100 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="space-y-2">
        {product.isFeatured && (
          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
            Featured Product
          </Badge>
        )}
        
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          {product.title || product.productName || "Untitled Product"}
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {renderStars(product.averageRating || 0)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.totalRatings || 0} customer reviews)
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="border-t border-b border-gray-100 py-4">
        <div className="flex items-end gap-3">
          <h2 className="text-4xl font-bold text-primary">
            ${currentPrice.toLocaleString()}
          </h2>
          {/* Discount Logic would go here if data existed */}
          {/* <span className="text-lg text-gray-400 line-through">$99.99</span> */}
        </div>
        
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {product.shortDescription || product.description?.slice(0, 150) + "..."}
        </p>
      </div>

      {/* Variants Selection */}
      {product.wholesaleId && product.wholesaleId.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Available Options</h3>
             {/* Optional: Size Guide or more info */}
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {product.wholesaleId.map((item) => {
              const price = getWholesalePrice(item);
              const isSelected = selectedWholesale?._id === item._id;
              
              return (
                <button
                  key={item._id}
                  onClick={() => setSelectedWholesale(item)}
                  type="button"
                  className={`relative flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <span className="block text-sm font-semibold capitalize text-gray-900">
                      {item.type}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    ${price}
                  </span>
                  
                  {isSelected && (
                    <div className="absolute right-0 top-0 -mr-2 -mt-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                            <Check className="h-3 w-3" />
                        </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* Quantity */}
        <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center rounded-lg border border-gray-200">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 text-gray-500 hover:text-primary disabled:opacity-50"
                  disabled={quantity <= 1}
                  type="button"
                >
                    <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-base font-semibold text-gray-900">
                    {quantity}
                </span>
                <button 
                   onClick={() => handleQuantityChange(1)}
                   className="p-3 text-gray-500 hover:text-primary"
                   type="button"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-1 gap-3">
             <Button 
                onClick={handleAddToCart} 
                disabled={isPending || !isAvailable}
                size="lg"
                className="h-12 flex-1 gap-2 text-base font-semibold"
            >
                <ShoppingCart className="h-5 w-5" />
                {isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button 
                onClick={handleWishlist}
                variant="outline" 
                size="lg"
                className="h-12 w-12 px-0"
                title="Add to Wishlist"
            >
                <Heart className="h-5 w-5" />
            </Button>
        </div>
      </div>

      {/* Meta Information */}
      <div className="mt-2 grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:grid-cols-4">
        <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-xs text-gray-400">
                <Package className="h-3 w-3" /> Type
            </span>
            <span className="text-sm font-medium text-gray-900">
                {product.productType || "N/A"}
            </span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="h-3 w-3" /> Origin
            </span>
            <span className="text-sm font-medium text-gray-900">
                {product.originCountry || "N/A"}
            </span>
        </div>
        <div className="flex flex-col gap-1">
             <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" /> Shelf Life
            </span>
            <span className="text-sm font-medium text-gray-900">
                {product.shelfLife || "N/A"}
            </span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" /> Status
            </span>
            <span className={`text-sm font-medium ${isAvailable ? "text-green-600" : "text-red-500"}`}>
                {isAvailable ? "In Stock" : "Unavailable"}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
