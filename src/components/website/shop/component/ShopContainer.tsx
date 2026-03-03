"use client";

import { useFetchAllProduct } from "@/lib/hooks/product";
import { useProductFilter } from "@/lib/hooks/useProductFilter";
import ShopPresenter from "./ShopPresenter";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ShopContainer = () => {
  const searchParams = useSearchParams();
  const productType = searchParams.get("productType");
  const country = searchParams.get("country");
  // console.log('country',productType,country)

  const {
    filters: query,
    setCategories,
    setPrice,
    setRegion,
    setProductType,
    setCountry,
    setFilterAttribute,
    setPage,
  } = useProductFilter({
    categories: [],
    productType: productType || undefined,
    region: country || undefined,
  });

  useEffect(() => {
    setProductType(productType);
    setCountry(country);
  }, [productType, country]);

  const { data, isLoading } = useFetchAllProduct(query);

  const metaData = data?.meta || {
    total: 0,
    page: 1,
    limit: 12,
    totalPage: 1,
  };
  return (
    <ShopPresenter
      products={data?.data || []}
      loading={isLoading}
      onCategoryChange={setCategories}
      onPriceChange={setPrice}
      onRegionChange={setRegion}
      onOriginCountryChange={setCountry}
      onProductTypeChange={setProductType}
      onAttributeChange={setFilterAttribute}
      onPageChange={setPage}
      query={query}
      metaData={metaData}
    />
  );
};

export default ShopContainer;
