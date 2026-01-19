"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import { useAddToCart } from '@/lib/hooks/cart'
import { useAddedWishlist } from '@/lib/hooks/wishlist'
import { Product, WholesaleItem } from '@/lib/types/product'
import { cn } from "@/lib/utils"

interface ProductDetailsActionsProps {
  product: Product;
}

const ProductDetailsActions = ({ product }: ProductDetailsActionsProps) => {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToWishlist } = useAddedWishlist();
  
  // Default to first wholesale option or null
  const [selectedWholesale, setSelectedWholesale] = useState<WholesaleItem | null>(
    product.wholesaleId?.[0] || null
  );

  // Helper to extract price from wholesale item
  const getPrice = (item: WholesaleItem) => {
      if (item.type === 'pallet' && item.palletItems?.[0]) {
          return item.palletItems[0].price;
      }
      if (item.type === 'case' && item.caseItems?.[0]) {
          return item.caseItems[0].price;
      }
      return 0;
  }

  const currentPrice = selectedWholesale ? getPrice(selectedWholesale) : 0;
  
  const handleAddToCart = () => {
    if (selectedWholesale) {
        addToCart({
            productId: product._id,
            wholesaleId: selectedWholesale._id,
            quantity: 1
        });
    } else {
        // Fallback for non-wholesale products (if any)
         addToCart({
            productId: product._id,
            quantity: 1
        });
    }
  }

  return (
    <div className="space-y-6">
        {/* Price & Stock Display */}
        <div className="space-y-2">
            <div className="flex items-end gap-3">
             <h2 className="text-3xl font-bold text-primary">${currentPrice}</h2>
            </div>
             <div className="flex items-center gap-2">
               <span className={cn("text-sm font-medium", product.isAvailable ? 'text-green-600' : 'text-red-600')}>
                 {product.isAvailable ? 'In Stock' : 'Out of Stock'}
               </span>
             </div>
        </div>

        {/* Wholesale Options Selector */}
        {product.wholesaleId && product.wholesaleId.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.wholesaleId.map((item) => (
                    <div 
                        key={item._id}
                        onClick={() => setSelectedWholesale(item)}
                        className={cn(
                            "cursor-pointer rounded-lg border p-3 transition-all hover:border-primary",
                            selectedWholesale?._id === item._id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200"
                        )}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-sm capitalize">{item.type}</span>
                            <span className="font-bold text-primary">${getPrice(item)}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">{item.label}</p>
                    </div>
                ))}
            </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={isPending || !product.isAvailable}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => addToWishlist(product._id)}>
                <Heart className="h-5 w-5" />
                Add to Wishlist
            </Button>
        </div>
    </div>
  )
}

export default ProductDetailsActions
