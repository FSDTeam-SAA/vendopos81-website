import { Product } from '@/lib/types/product'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SearchCard = ({ product }: { product: Product }) => {
  return (
    <Link 
      href={`/product/${product.slug}`}
      className='p-3 flex gap-5 items-center hover:bg-gray-50 transition-colors border-b last:border-b-0 group'
    >
         <Image 
            className='w-16 h-16 rounded-md object-cover border border-gray-100' 
            src={product.images?.[0]?.url || '/images/no.jpg'} 
            alt={product.title} 
            width={100} 
            height={100} 
          />
         <div className='flex-1 overflow-hidden'>
            <h3 className='text-sm md:text-base font-semibold group-hover:text-primary transition-colors truncate'> 
                {product.title || 'No Title' }
            </h3>
            <p className='text-gray-500 text-xs font-normal line-clamp-2 mt-1'>
                {product.shortDescription || product.description || "No Description"}
            </p>
         </div>
    </Link>
  )
}

export default SearchCard