 'use client'
 import ProductCard from "@/components/sheard/productCard";
import { useFetchAllProduct } from "@/lib/hooks/product";
import React from "react";

const FeatureProduct = () => {
  const { data, isLoading, error } = useFetchAllProduct({
    search: "Red Palm Oil",
    region: "Middle Africa",
    page: 1,
    limit: 10,
    productType: "Hot Sauces",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
 console.log('data',data)
  return (
    <section className="my-10 md:my-16 xl:my-20">
        <div className="container mx-auto">

      <ProductCard />
        </div>
    </section>
  );
};

export default FeatureProduct;
