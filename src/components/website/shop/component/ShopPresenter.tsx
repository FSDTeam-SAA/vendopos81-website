'use client'
import ProductCard from "@/components/shared/productCard";
import HeadShowFilter from "../common/HeadShowFilter";
import SidebarFilter from "../common/SidebarFilter";
import { motion } from "framer-motion";


import { Product, ProductParams } from "@/lib/types/product";

// const CATEGORIES = [
//   { id: '1', label: 'Cabbage', value: 'cabbage' },
//   { id: '2', label: 'Broccoli', value: 'broccoli' },
//   { id: '3', label: 'Artichoke', value: 'artichoke' },
//   { id: '4', label: 'Celery', value: 'celery' },
//   { id: '5', label: 'Spinach', value: 'spinach' },
// ];

interface Props {
  products: Product[];
  loading: boolean;
  onCategoryChange: (v: string[]) => void;
  onPriceChange: (v: [number, number]) => void;
  onRegionChange: (v: string | null) => void;
  onProductTypeChange: (v: string | null) => void;
  query: ProductParams;
}

const ShopPresenter = ({
  products,
  loading,
  onCategoryChange,
  onPriceChange,
  onRegionChange,
  onProductTypeChange,
  query
}: Props) => {

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
  return (
    <div className="container mx-auto px-4 py-8">
      <HeadShowFilter 
        query={query} 
        onFilterChange={onCategoryChange} 
        onRegionChange={onRegionChange}
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
            query={query}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-500 text-sm font-medium mb-4 sm:mb-0">
                    We found <span className="text-primary font-bold">{products?.length || 0}</span> items for you!
                </p>
{/* 
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 hidden sm:inline">Show:</span>
                        <select className="border-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary p-2 bg-white text-gray-700">
                            <option>50</option>
                            <option>100</option>
                            <option>All</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                        <select className="border-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary p-2 bg-white text-gray-700 min-w-[120px]">
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                    </div>
                </div> */}
            </div>

            {/* Product Grid */}
  <motion.div
    variants={gridVariants}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    {products?.map((item) => (
      <ProductCard key={item._id} product={item} />
    ))}
  </motion.div>

            {/* Empty State */}
            {!loading && products?.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default ShopPresenter;
