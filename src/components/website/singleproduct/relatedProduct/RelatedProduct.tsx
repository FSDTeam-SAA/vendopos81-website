import ProductCard from '@/components/shared/productCard'
import { Product } from '@/lib/types/product'
import { ChevronRight, Link } from 'lucide-react'
import React from 'react'

const RelatedProduct = ({data}:{data:Product[]}) => {
  return (
 <section className="my-10 md:my-16 xl:my-20">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Related Products
          </h2>
      
        </div>

        {data.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-500">No products found</h3>
            <p className="text-gray-400 mt-2">Check back later for new products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-6">
            {data.map((item: Product) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RelatedProduct

