import Subscription from '@/components/home/Subscription'
import WishlistCard from '@/components/shared/WishlistCard'
import WishlistPresenterComponent from '@/components/wishlist/components/WishlistPresenterComponent'
import React from 'react'

const page = () => {
  return (
    <div>
           <WishlistPresenterComponent />
           <Subscription />
    </div>
  )
}

export default page