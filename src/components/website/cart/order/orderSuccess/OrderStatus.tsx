"use client"

import React from 'react'
import { 
  CheckCircle,
  Circle
} from 'lucide-react'
import { useOrders } from '@/lib/hooks/useOrder'


const OrderStatus = () => {
  const { data: orderResponse } = useOrders({ page: 1, limit: 10 })
  const orders = orderResponse?.data || []
  const latestOrder = orders[0]
  
  const currentStatus = latestOrder?.orderStatus || 'pending'

  const statusSteps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your order has been placed successfully",
      completed: true,
      status: 'pending'
    },
    {
      id: 2,
      title: "Processing",
      description: "We're preparing your items",
      completed: ['processing', 'shipped', 'completed'].includes(currentStatus),
      status: 'processing'
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your package is on its way",
      completed: ['shipped', 'completed'].includes(currentStatus),
      status: 'shipped'
    },
    {
      id: 4,
      title: "Delivered",
      description: currentStatus === 'completed' ? "Your order has been delivered" : "Waiting for delivery",
      completed: currentStatus === 'completed',
      status: 'completed'
    },
  ]

  return (
    <div className=" container mx-auto bg-gray-50 flex items-center justify-center p-4">
      <div className="m w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Order Status
          </h1>

          <div className="space-y-8">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Vertical line connector */}
                {index < statusSteps.length - 1 && (
                  <div className={`absolute left-6 top-16 h-16 w-0.5 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}

                <div className="flex items-start gap-4">
                  {/* Status icon */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-100 text-green-600 border-2 border-green-200' 
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-semibold ${
                        step.completed ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>
                      {step.completed && (
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {step.status === currentStatus ? 'Active' : 'Completed'}
                        </span>
                      )}
                    </div>
                    
                    <p className={`mt-2 ${
                      step.completed ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus