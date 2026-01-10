"use client";
import ProductCard from "@/components/shared/productCard";
import { useFetchAllProduct } from "@/lib/hooks/product";
import { Product } from "@/lib/types/product";
import React from "react";

const FeatureProduct = () => {
  const { data, isLoading, error } = useFetchAllProduct({
    search: "",
    region: "",
    page: 1,
    limit: 10,
    productType: "",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  
  const productData = data?.data || [];
  
  return (
    <section className="my-10 md:my-16 xl:my-20">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
          <p className="text-gray-600 mt-2">Discover our best products</p>
        </div>

        {productData.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-500">No products found</h3>
            <p className="text-gray-400 mt-2">Check back later for new products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {productData.map((item: Product) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureProduct;