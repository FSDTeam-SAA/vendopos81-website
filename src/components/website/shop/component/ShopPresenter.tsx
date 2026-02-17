"use client";
import ProductCard from "@/components/shared/productCard";
import { motion } from "framer-motion";
import { useEffect } from "react";
import HeadShowFilter from "../common/HeadShowFilter";
import SidebarFilter from "../common/SidebarFilter";
import Pagination from "@/components/wishlist/common/Pagination";
import { Product, ProductParams } from "@/lib/types/product";

interface Props {
  products: Product[];
  loading: boolean;
  onCategoryChange: (v: string[]) => void;
  onPriceChange: (v: [number, number]) => void;
  onRegionChange: (v: string | null) => void;
  onOriginCountryChange: (v: string | null) => void;
  onProductTypeChange: (v: string | null) => void;
  onAttributeChange: <K extends keyof ProductParams>(
    key: K,
    value: ProductParams[K],
  ) => void;
  onPageChange: (page: number) => void;
  query: ProductParams;
  metaData: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

const ShopPresenter = ({
  products,
  loading,
  onCategoryChange,
  onPriceChange,
  onRegionChange,
  onOriginCountryChange,
  onProductTypeChange,
  onAttributeChange,
  onPageChange,
  query,
  metaData,
}: Props) => {
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 50, damping: 20 },
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [metaData.page]);

  console.log("In side component",products);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeadShowFilter
        query={query}
        onFilterChange={onCategoryChange}
        onRegionChange={onRegionChange}
        onOriginCountryChange={onOriginCountryChange}
        onProductTypeChange={onProductTypeChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <SidebarFilter
            onCategoryChange={onCategoryChange}
            onPriceChange={onPriceChange}
            onRegionChange={onRegionChange}
            onProductTypeChange={onProductTypeChange}
            onAttributeChange={onAttributeChange}
            query={query}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-4 sm:mb-0">
              We found{" "}
              <span className="text-primary font-bold">
                {metaData?.total || 0}
              </span>{" "}
              items for you!
            </p>
          </div>

          {/* Product Grid */}
          <motion.div
            key={metaData.page} // Forces re-animation on page change
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products?.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                className="h-full"
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8">
            {metaData?.totalPage > 1 && (
              <Pagination
                currentPage={metaData.page}
                totalPages={metaData.totalPage}
                onPageChange={onPageChange}
                itemsPerPage={metaData.limit}
                totalItems={metaData.total}
              />
            )}
          </div>

          {/* Empty State */}
          {!loading && products?.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPresenter;
