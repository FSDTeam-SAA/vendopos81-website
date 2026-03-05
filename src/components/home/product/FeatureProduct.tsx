"use client";
import ErrorPage from "@/components/shared/error";
import LoadingPage from "@/components/shared/Loading";
import ProductCard from "@/components/shared/productCard";
import { useFetchFeatureProduct } from "@/lib/hooks/product";
import { Product } from "@/lib/types/product";

const FeatureProduct = () => {
  const { data, isLoading, error } = useFetchFeatureProduct();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage noNeed={false} />;
  }

  const productData = data?.data || [];

  return (
    <section className="my-10 md:my-12 xl:my-16 px-5 lg:px-0">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
          {/* <p className="text-gray-600 mt-2">Discover our best products</p> */}
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

export default FeatureProduct;
