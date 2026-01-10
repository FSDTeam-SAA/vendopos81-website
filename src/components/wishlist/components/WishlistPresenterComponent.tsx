'use client'
import WishlistCard from '@/components/shared/WishlistCard'
import { useWishlistData } from '@/lib/hooks/wishlist'
import React, { useState } from 'react'
import Pagination from '../common/Pagination'

const WishlistPresenterComponent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {data, isError, isLoading} = useWishlistData(currentPage)
  console.log('wishlist data', data)
  
  // Handle loading state
  if (isLoading) {
    return (
      <section className='my-10 md:my-16 lg:my-20'>
        <div className='container mx-auto'>
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Loading wishlist...</p>
          </div>
        </div>
      </section>
    )
  }
  
  // Handle error state
  if (isError || !data) {
    return (
      <section className='my-10 md:my-16 lg:my-20'>
        <div className='container mx-auto'>
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-red-600 mb-2">
              Failed to load wishlist
            </h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </section>
    )
  }
  
  // Extract data from response
  const wishlistItems = data.data || []
  const meta = data.meta
  const totalPages = meta?.totalPage || 1
  const totalItems = meta?.total || 0
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section className='my-10 md:my-16 lg:my-20'>
      <div className='container mx-auto'>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>
        
        {/* Wishlist items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 rounded-lg border-2 border-dashed border-gray-300">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500">
                Start adding products you love to your wishlist
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className=" space-y-10 gap-4 md:gap-6">
              {wishlistItems.map((item) => (
                <WishlistCard key={item._id} data={item} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={meta?.limit || 12}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default WishlistPresenterComponent