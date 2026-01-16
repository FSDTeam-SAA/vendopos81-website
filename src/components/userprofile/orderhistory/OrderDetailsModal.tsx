"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/lib/types/order"

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
             <Badge
                variant={order.paymentStatus === "paid" ? "default" : "destructive"}
                className={
                  order.paymentStatus === "paid" 
                    ? "bg-teal-100 text-teal-700 hover:bg-teal-200 border-none" 
                    : "bg-red-100 text-red-700 hover:bg-red-200 border-none"
                }
              >
                {order.paymentStatus.toUpperCase()}
              </Badge>
          </div>
          <DialogDescription>
             Invoice ID: <span className="font-medium text-gray-900">{order.orderUniqueId}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 px-6 overflow-y-auto">
          <div className="space-y-6 pb-6">
            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Order Date</p>
                <p className="font-medium">
                  {order.purchaseDate 
                    ? new Date(order.purchaseDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
               <div>
                <p className="text-gray-500">Payment Method</p>
                <p className="font-medium capitalize">{order.paymentType}</p>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Items */}
            <div>
              <h4 className="font-medium mb-3">Items</h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name || "Product Name Unavailable"}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${item.price?.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

             <hr className="my-4 border-gray-200" />

            {/* Billing Info */}
             <div>
              <h4 className="font-medium mb-2">Billing Information</h4>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">{order.billingInfo.name}</p>
                <p>{order.billingInfo.email}</p>
                <p>{order.billingInfo.phone}</p>
                <p>{order.billingInfo.address}</p>
                <p>{order.billingInfo.city}</p>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="font-bold text-xl text-primary">
                ${order.totalPrice?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailsModal
