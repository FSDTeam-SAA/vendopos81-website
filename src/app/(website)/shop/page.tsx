import ShopContainer from '@/components/website/shop/component/ShopContainer'
import Subscription from '@/components/website/shop/Subscription'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopContainer />

        <Subscription />
      </Suspense>
    </section>
  )
}

export default page