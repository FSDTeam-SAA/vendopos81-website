"use client";

import { X, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cancelledItems = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    quantity: 1,
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    quantity: 1,
    price: "$399.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Portable Speaker",
    quantity: 1,
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
  },
];

export default function page() {
  return (
    <section className="my-20">
      <div className="container mx-auto min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-red-500 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <X className="w-12 h-12 text-red-500" strokeWidth={3} />
              </div>
            </div>
            <h5 className="text-4xl font-bold text-white mb-4">Order Cancelled</h5>
            <span className="text-lg opacity-90">
              Your order has been cancelled successfully. We&apos;re sorry to see you
              go!
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Order Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-700 font-semibold mb-2">Order Number</h3>
              <p className="text-gray-800 text-lg font-medium">
                ORD-2024-27728
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-700 font-semibold mb-2">Cancelled On</h3>
              <p className="text-gray-800 text-lg font-medium">
                Thursday, December 25, 2025 at 01:47 AM
              </p>
            </div>
          </div>

          {/* Cancelled Items */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cancelled Items
            </h2>
            <div className="space-y-6">
              {cancelledItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Total Refund */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">
                  Total Refund Amount
                </p>
                <p className="text-2xl font-bold text-green-600">$629.97</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="bg-[#09714E] text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-white text-center">
            <h4 className="text-3xl font-bold text-white mb-2">
              We&apos;d Love to See You Again!
            </h4>
            <h5 className="text-white mb-8">
              Explore our collection and find something you&apos;ll love
            </h5>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Continue Shopping
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-green-600 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
