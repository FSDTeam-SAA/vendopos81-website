import { useState } from "react";
import { ProductParams } from "../types/product";

export function useProductFilter() {
  const [filters, setFilters] = useState<ProductParams>({});

  const setCategories = (categories: string[]) => {
    // Assuming the API expects a comma-separated string or array for categories
    // Adjusting based on ProductParams type which likely needs mapped logic if complex
    // For now, mapping to categorySlug or similar if needed, but based on usage in ShopPresenter:
    // onCategoryChange={setCategories} implies it receives string[]
    // But ProductParams has categorySlug?: string.
    // Let's assume for now we might need to join them or just update a specific field.
    // However, looking at ShopContainer usage: const { filters, setCategories, setPrice } = useProductFilter();
    // And passed to ShopPresenter: onCategoryChange={setCategories}
    
    // Let's implementation a simple version first
    setFilters((prev) => ({ ...prev, categorySlug: categories.join(",") })); 
  };

  const setPrice = (priceRange: [number, number]) => {
     setFilters((prev) => ({ ...prev, minPrice: priceRange[0], maxPrice: priceRange[1] }));
  };

  return {
    filters,
    setCategories: (categories: string[]) => {
        // If categories is array of slugs/ids
        setFilters(prev => ({ ...prev, categorySlug: categories.length > 0 ? categories.join(',') : undefined }));
    },
    setPrice: (range: [number, number]) => {
        setFilters(prev => ({ ...prev, minPrice: range[0], maxPrice: range[1] }));
    }
  };
}
