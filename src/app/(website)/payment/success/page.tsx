import OrderItems from '@/components/website/cart/order/orderSuccess/OrderItems'
import OrderStatus from '@/components/website/cart/order/orderSuccess/OrderStatus'
import OrderTrackAndInvoice from '@/components/website/cart/order/orderSuccess/OrderTrackAndInvoice'
import ShippingDetails from '@/components/website/cart/order/orderSuccess/ShipingDetails'
import React from 'react'

const page = () => {
  return (
    <div>
        <OrderTrackAndInvoice />
        <OrderStatus />
        <OrderItems />
        <ShippingDetails />
    </div>
  )
}

export default page