import ShopContainer from '@/components/website/shop/component/ShopContainer'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopContainer />
      </Suspense>
    </section>
  )
}

export default page