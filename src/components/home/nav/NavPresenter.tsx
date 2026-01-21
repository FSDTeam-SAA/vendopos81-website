import SearchCard from '@/components/shared/SearchCard'
import { Product } from '@/lib/types/product'
import React from 'react'

const NavPresenter = ({ products }: { products: Product[] }) => {
  return (
    <div className='flex flex-col'>
      {products.map((product) => (
        <SearchCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default NavPresenter