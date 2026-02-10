"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useOrder } from '@/lib/hooks/useOrder'
import { Order, OrderItem } from '@/lib/types/orderSuccess'



const OrderItems = () => {
  const { data: orderResponse, isLoading } = useOrder({ page: 1, limit: 10 })
  
  // Get the latest order (assuming first in the array)
  const orders = orderResponse?.data || []
  const latestOrder = orders[0] as Order
  
  const orderItems = latestOrder?.items || []
  const subtotal = latestOrder?.totalPrice || 0
  const total = subtotal 
  const currency = 'USD' // Defaulting to USD as it's not in the Order type from orderSuccess.ts

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  if (isLoading) {
    return <div className="p-10 text-center">Loading order items...</div>
  }

  if (!latestOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardContent className="p-10 text-center text-gray-500">
            No recent orders found.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-0 py-8 ">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Order Items</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Order Items List */}
          <div className="space-y-6 mb-8">
            {orderItems.map((item: OrderItem, index: number) => (
              <div key={index} className="flex justify-between items-start pb-6 border-b">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.product?.title || 'Product'}</h3>
                  <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(item.unitPrice)}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <Separator className="mb-6" />

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Price</span>
              <span className="font-medium text-lg">{formatCurrency(total)}</span>
            </div>

            {/* Divider before total */}
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderItems