
import { useSingleProductReview } from '@/lib/hooks/product'
import React from 'react'

const SingleProductReview = ({id}:{id:string}) => {
    const {data,isLoading}=useSingleProductReview(id)
  return (
    <div>
        
    </div>
  )
}

export default SingleProductReview