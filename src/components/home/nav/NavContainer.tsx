"use client";
import React from 'react'
import NavPresenter from './NavPresenter'
import { useFetchAllProduct } from '@/lib/hooks/product'

const NavContainer = ({ searchData }: { searchData: string }) => {
  const { data: productsData, isLoading } = useFetchAllProduct({
    search: searchData,
    limit: 5
  });

  const products = productsData?.data || [];

  if (!searchData || searchData.trim().length === 0) return null;

  return (
    <div className='absolute left-0  top-full w-full max-w-xl bg-white shadow-2xl rounded-b-xl border border-t-0 z-[100] max-h-[400px] overflow-y-auto'>
      {isLoading ? (
        <div className='p-4 text-center text-gray-500'>Searching...</div>
      ) : products.length > 0 ? (
        <NavPresenter products={products} />
      ) : (
        <div className='p-4 text-center text-gray-500'>No products found for &ldquo;{searchData}&ldquo;</div>
      )}
    </div>
  )
}

export default NavContainer