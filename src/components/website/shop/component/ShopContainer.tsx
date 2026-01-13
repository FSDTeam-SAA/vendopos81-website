"use client";

import { useFetchAllProduct } from "@/lib/hooks/product";
import { useProductFilter } from "@/lib/hooks/useProductFilter";
import ShopPresenter from "./ShopPresenter";
import { Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";


const ShopContainer = () => {
  const searchParams = useSearchParams();
  const productType = searchParams.get('productType');
  const country = searchParams.get('country');

  const { filters: query, setCategories, setPrice, setRegion, setProductType } = useProductFilter({
    productType: productType || undefined,
    region: country || undefined,
  });

  const { data, isLoading } = useFetchAllProduct(query);

  return (
    <ShopPresenter
      products={data?.data || []}
      loading={isLoading}
      onCategoryChange={setCategories}
      onPriceChange={setPrice}
      onRegionChange={setRegion}
      onProductTypeChange={setProductType}
      query={query}
     
    />
  );
};

export default ShopContainer;
