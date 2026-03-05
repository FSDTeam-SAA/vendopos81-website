"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order, OrderItem } from "@/lib/types/orderSuccess";
import { Clock, Mail, MapPin, Phone, User } from "lucide-react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
}: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 rounded-xl">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Order Details
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Invoice ID: {order.orderUniqueId}
              </DialogDescription>
            </div>

            <div className="flex items-center gap-3 mr-2">
              <Badge
                variant={
                  order.orderStatus === "delivered"
                    ? "default"
                    : order.orderStatus === "pending"
                      ? "secondary"
                      : "destructive"
                }
                className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all"
              >
                {order.orderStatus.toUpperCase()}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TIMELINE */}
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2 text-gray-800">
              <Clock size={16} />
              Order Timeline
            </h4>

            <div className="border rounded-lg p-4 space-y-5 text-sm bg-gray-50">
              {/* Order Placed */}
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 mt-1 rounded-full bg-green-500 shadow" />
                <div>
                  <p className="font-medium text-gray-800">Order Placed</p>
                  <p className="text-gray-500 text-xs">
                    {order.purchaseDate
                      ? new Date(order.purchaseDate).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-4 h-4 mt-1 rounded-full shadow ${
                    order.orderStatus === "delivered"
                      ? "bg-green-500"
                      : order.orderStatus === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-800">Order Status</p>
                  <p className="text-gray-600 text-xs capitalize">
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOMER & SHIPPING */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CUSTOMER INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h4 className="font-medium mb-4 flex items-center gap-2 text-gray-800">
                <User size={16} />
                Customer Information
              </h4>

              <div className="text-sm space-y-2">
                <p className="font-semibold text-gray-900">
                  {order.billingInfo?.name || "N/A"}
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} className="text-gray-500" />
                  {order.billingInfo?.email || "N/A"}
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="text-gray-500" />
                  {order.billingInfo?.phone || "N/A"}
                </p>
              </div>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="border rounded-lg p-4 bg-white">
              <h4 className="font-medium mb-4 flex items-center gap-2 text-gray-800">
                <MapPin size={16} />
                Shipping Address
              </h4>

              <div className="text-sm text-gray-600 space-y-1">
                <p>{order.billingInfo?.address || "N/A"}</p>
                <p>{order.billingInfo?.city || "N/A"}</p>
                <p>{order.billingInfo?.country || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* <hr /> */}

          {/* ITEMS */}
          <div>
            <h4 className="font-medium mb-4 text-gray-800">Order Items</h4>

            <div className="space-y-3">
              {order.items.map((item: OrderItem, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-centTranslationer p-4 border rounded-lg  bg-white"
                >
                  <div className="flex gap-4">
                    {/* PRODUCT IMAGE */}
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No Image</span>
                      </div>
                    )}

                    {/* PRODUCT DETAILS */}
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.product?.title || "Product Unavailable"}
                      </p>

                      <div className="text-xs text-gray-500 mt-1 space-y-1">
                        <p>Qty: {item.quantity}</p>
                        {item.variant && <p>Variant: {item.variant.label}</p>}
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.unitPrice || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Total: ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <hr /> */}

          {/* PAYMENT */}
          <div className="border rounded-lg p-4 bg-white">
            <h4 className="font-medium mb-4 text-gray-800">
              Payment Information
            </h4>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <p className="text-gray-500">Payment Method</p>
              <p className="capitalize text-gray-800">
                {order.paymentType || "N/A"}
              </p>

              <p className="text-gray-500">Payment Status</p>
              <Badge
                variant={
                  order.paymentStatus === "paid" ? "default" : "destructive"
                }
                className={`px-2 py-1 text-xs font-medium ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : ""
                }`}
              >
                {order.paymentStatus?.toUpperCase() || "N/A"}
              </Badge>
            </div>
          </div>

          <hr />

          {/* TOTAL */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total Amount</span>
            <span className="font-bold text-xl text-green-700">
              ${order.totalPrice?.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
