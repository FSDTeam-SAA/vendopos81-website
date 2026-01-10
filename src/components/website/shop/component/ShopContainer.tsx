"use client";

import { useFetchAllProduct } from "@/lib/hooks/product";
import { useProductFilter } from "@/lib/hooks/useProductFilter";
import ShopPresenter from "./ShopPresenter";


const ShopContainer = () => {
  const { filters, setCategories, setPrice } = useProductFilter();
  const { data, isLoading } = useFetchAllProduct(filters);

  return (
    <ShopPresenter
      products={data?.data || []}
      loading={isLoading}
      onCategoryChange={setCategories}
      onPriceChange={setPrice}
    />
  );
};

export default ShopContainer;
