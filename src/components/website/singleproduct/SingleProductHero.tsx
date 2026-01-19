/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Star, Heart, Check, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAddToCart } from "@/lib/hooks/cart";
import { useAddedWishlist } from "@/lib/hooks/wishlist";
import { WholesaleItem, Product, ProductVariant } from "@/lib/types/product";
import { cn } from "@/lib/utils";

type SelectedOption = WholesaleItem | ProductVariant;

export default function SingleProductHero({ product }: { product: Product }) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToWishlist } = useAddedWishlist();

  const safeProduct = product ?? {};
  console.log('safeproduct',safeProduct)
  
  // -- COMPUTED LISTS --
  const wholesaleList = safeProduct.wholesaleId ?? [];
  const variantList = safeProduct.variants ?? [];
  const images = safeProduct.images?.filter((i: any) => i?.url) ?? [];

  // -- STATE --
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  // Initialize selected option (Wholesale takes priority, then Variants)
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);

  // Effect to set initial state when product loads
  useEffect(() => {
    if (wholesaleList.length > 0) {
      setSelectedOption(wholesaleList[0]);
    } else if (variantList.length > 0) {
      setSelectedOption(variantList[0]);
    }
  }, [safeProduct._id]); // result of product change

  // Effect to set initial image
  useEffect(() => {
    if (images.length > 0 && !activeImg) {
      setActiveImg(images[0].url);
    }
  }, [images, activeImg]);

  // -- PRICE LOGIC --
  const getPrice = (option: SelectedOption | null): number => {
    if (!option) return safeProduct.priceFrom || 0;

    // Check if it's a WholesaleItem (look for type 'case' or 'pallet')
    if ('type' in option) { 
       const wItem = option as WholesaleItem;
       if (wItem.type === "pallet" && wItem.palletItems?.[0]) return wItem.palletItems[0].price || 0;
       if (wItem.type === "case" && wItem.caseItems?.[0]) return wItem.caseItems[0].price || 0;
       return 0;
    } 
    
    // Explicitly check for ProductVariant properties
    if ('price' in option) {
        return (option as ProductVariant).price || 0;
    }

    return 0;
  };

  const currentPrice = getPrice(selectedOption);

  // -- HANDLERS --
  const handleQuantity = (val: number) => {
    setQuantity((prev) => Math.max(1, prev + val));
  };

  const handleAddToCart = () => {
    if (!safeProduct._id) return;

    if (selectedOption) {
        // Determine if it's Wholesale or Variant
        if ('type' in selectedOption) {
             // Wholesale
            addToCart({
                productId: safeProduct._id,
                wholesaleId: selectedOption._id,
                quantity
            });
        } else {
            // Variant
            addToCart({
                productId: safeProduct._id,
                variantId: selectedOption._id,
                quantity
            });
        }
    } else {
        // No options (Standard Product)
        addToCart({
            productId: safeProduct._id,
            quantity
        });
    }
  };

  const handleWishlist = () => {
      if(safeProduct._id) addToWishlist(safeProduct._id);
  }

  // Type Guards for rendering
  const showWholesale = wholesaleList.length > 0;
  const showVariants = !showWholesale && variantList.length > 0;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT – IMAGE GALLERY */}
        <div>
          <Card className="rounded-xl p-6 border-0 shadow-none bg-gray-50/50">
            <div className="relative aspect-square mix-blend-multiply">
              {activeImg ? (
                <Image
                  src={activeImg}
                  alt={safeProduct.title || "Product image"}
                  fill
                  className="object-contain p-4"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </Card>

          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img: any, index: number) => {
                const isActive = activeImg === img.url;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImg(img.url)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg border bg-white p-2 transition-all",
                      isActive ? "border-primary ring-1 ring-primary" : "border-gray-200 hover:border-primary/50"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt="thumbnail"
                      fill
                      className="object-contain"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT – PRODUCT INFO */}
        <div className="space-y-6">
          <div className="space-y-2">
            {safeProduct.isFeatured && <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Featured</Badge>}
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {safeProduct.title || "Untitled Product"}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
                <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <Star 
                            key={i} 
                            size={16} 
                            className={cn(
                                i < (safeProduct.averageRating || 0) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "fill-gray-100 text-gray-200"
                            )} 
                        />
                    ))}
                </div>
                <span className="text-gray-500">({safeProduct.totalRatings ?? 0} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 border-b border-gray-100 pb-6">
            <span className="text-4xl font-bold text-primary">
              ${currentPrice}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-lg">
            {safeProduct.shortDescription || safeProduct.description?.slice(0, 150) || "No description available."}
          </p>

          {/* CONDITIONAL SELECTION: WHOLESALE OR VARIANTS */}
          
          {/* 1. Wholesale Options */}
          {showWholesale && (
            <div className="space-y-3 pt-2">
              <h3 className="font-semibold text-sm text-gray-900">Choose Option (Wholesale)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wholesaleList.map((item) => {
                    const price = getPrice(item);
                    const isSelected = selectedOption?._id === item._id;

                    return (
                        <button
                            key={item._id}
                            onClick={() => setSelectedOption(item)}
                            className={cn(
                                "relative flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                                isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"
                            )}
                        >   
                            <div>
                                <span className="block font-semibold text-sm capitalize">{item.type}</span>
                                <span className="text-xs text-gray-500 line-clamp-1">{item.label}</span>
                            </div>
                            <span className="font-bold text-primary">${price}</span>
                            {isSelected && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                        </button>
                    )
                })}
              </div>
            </div>
          )}

          {/* 2. Variant Options (Only if no wholesale) */}
          {showVariants && (
             <div className="space-y-3 pt-2">
              <h3 className="font-semibold text-sm text-gray-900">Choose Option</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variantList.map((item) => {
                    const price = getPrice(item); // Should work since item is ProductVariant
                    const isSelected = selectedOption?._id === item._id;
                    const label = item.label || item.unit || "Variant";

                    return (
                        <button
                            key={item._id}
                            onClick={() => setSelectedOption(item)}
                            className={cn( // Strict TS might need item as SelectedOption cast if inferred wrong, but union should hold
                                "relative flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                                isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"
                            )}
                        >   
                            <div>
                                <span className="block font-semibold text-sm capitalize">{label}</span>
                                {item.stock < 10 && <span className="text-xs text-red-500">Only {item.stock} left</span>}
                            </div>
                            <span className="font-bold text-primary">${price}</span>
                            {isSelected && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                        </button>
                    )
                })}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             {/* Quantity */}
             <div className="flex items-center rounded-lg border border-gray-200 w-fit">
                <button onClick={() => handleQuantity(-1)} disabled={quantity <= 1} className="p-3 hover:text-primary disabled:opacity-50">
                    <Minus size={16} />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button onClick={() => handleQuantity(1)} className="p-3 hover:text-primary">
                    <Plus size={16} />
                </button>
             </div>

             <Button size="lg" className="flex-1 gap-2 text-base" onClick={handleAddToCart} disabled={isPending || !safeProduct.isAvailable}>
                 <ShoppingCart size={20} />
                 {safeProduct.isAvailable ? "Add to Cart" : "Out of Stock"}
             </Button>
             
             <Button variant="outline" size="lg" className="px-4" onClick={handleWishlist}>
                 <Heart size={20} className={cn(false ? "fill-red-500 text-red-500" : "")} /> 
             </Button>
          </div>

          {/* META INFO */}
           <div className="pt-6 space-y-2 text-sm border-t border-gray-100">
            <div className="flex justify-between py-1 border-b border-gray-50 max-w-xs">
                <span className="text-gray-500">Type</span>
                <span className="font-medium text-gray-900">{safeProduct.productType || "—"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50 max-w-xs">
                <span className="text-gray-500">Origin</span>
                <span className="font-medium text-gray-900">{safeProduct.originCountry || "—"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50 max-w-xs">
                <span className="text-gray-500">Shelf Life</span>
                <span className="font-medium text-gray-900">{safeProduct.shelfLife || "—"}</span>
            </div>
            <div className="flex justify-between py-1 max-w-xs">
                <span className="text-gray-500">Stock</span>
                <span className={cn("font-medium", safeProduct.isAvailable ? "text-green-600" : "text-red-600")}>
                    {safeProduct.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
