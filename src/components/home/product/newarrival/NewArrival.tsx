"use client";
import ProductCard from "@/components/shared/productCard";
import { useFetchAllProduct } from "@/lib/hooks/product";
import { Product } from "@/lib/types/product";

import ErrorPage from "@/components/shared/error";
import LoadingPage from "@/components/shared/Loading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const NewArrival = () => {
  const { data, isLoading, error } = useFetchAllProduct();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage noNeed={true} />;
  }

  const productData = data?.data.slice(0, 5) || [];

  return (
    <section className="my-10 md:my-16 xl:my-20 px-5 lg:px-0">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            New Arrival
          </h2>
          <Link href={"/allproduct"}>
            <h5 className="text-[#09714E] ho flex items-center  gap-2">
              View All
              <ChevronRight className="  text-2xl! ml-1" />
            </h5>
          </Link>
        </div>

        {productData.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-500">
              No products found
            </h3>
            <p className="text-gray-400 mt-2">
              Check back later for new products
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-6">
            {productData.map((item: Product) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrival;
