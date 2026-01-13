import { useState } from "react";
import { ProductParams } from "../types/product";

export function useProductFilter(initialFilters?: ProductParams) {
  const [filters, setFilters] = useState<ProductParams>({
    page: 1,
    limit: 12,
    ...initialFilters
  });

  return {
    filters,
    setCategories: (categories: string[]) => {
        setFilters(prev => ({ ...prev, categorySlug: categories.length > 0 ? categories.join(',') : undefined }));
    },
    setPrice: (range: [number, number]) => {
        setFilters(prev => ({ ...prev, minPrice: range[0], maxPrice: range[1] }));
    },
    setRegion: (region: string | null) => {
        setFilters(prev => ({ ...prev, region: region || undefined }));
    },
    setProductType: (type: string | null) => {
        setFilters(prev => ({ ...prev, productType: type || undefined }));
    },
    setSearch: (search: string) => {
        setFilters(prev => ({ ...prev, search: search || undefined }));
    },
    setPage: (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    }
  };
}
