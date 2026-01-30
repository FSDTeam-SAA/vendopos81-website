'use client'
import { Button } from "@/components/ui/button";
import { useOrder } from "@/lib/hooks/useOrder";
import { generateInvoicePDF } from "@/lib/utils/invoice";
import { Order } from "@/lib/types/orderSuccess";

import { Check } from "lucide-react";
import React from "react";

const OrderTrackAndInvoice = () => {
  const { data: orderResponse } = useOrder({ page: 1, limit: 10000 });
  const orders = orderResponse?.data || [];
  const latestOrder = orders[0] as Order;

  const orderNumber = latestOrder?._id ? `ORD-${latestOrder._id.slice(-8).toUpperCase()}` : "ORD-0000-00000";
  const orderDate = latestOrder?.purchaseDate 
    ? new Date(latestOrder.purchaseDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "Date not available";

  const handleDownloadInvoice = () => {
    if (latestOrder) {
      generateInvoicePDF(latestOrder);
    }
  };

  return (
    <section className="">
      <div className=" container mx-auto my-8 shadow-2xl ">
        <div
          className="flex flex-col items-center text-center gap-3 p-6 rounded-t-xl
  bg-[linear-gradient(90deg,#00C950_0%,#00A63E_100%)] text-white"
        >
          <div className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <Check className="text-green-600 w-5 h-5" />
          </div>

          <h5 className="text-lg text-white font-semibold">Order Placed Successfully!</h5>

          <h5 className="text-sm text-white opacity-90">
            Thank you for your purchase. Your order has been confirmed.
          </h5>
        </div>
        <div className="rounded-b-xl p-8">
            <div className="grid grid-cols-2 gap-10 mx-auto my-5">
          <div  className="bg-[#F9FAFB] py-3 px-5">
            <p>Order Number</p>
            <p>{orderNumber}</p>
          </div>
          <div className="bg-[#F9FAFB] py-3 px-5">
            <p>Order Date</p>
            <p>{orderDate}</p>
          </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
                <Button>
                    Track Order
                </Button>
                <Button 
                  onClick={handleDownloadInvoice}
                  disabled={!latestOrder}
                  className="bg-white text-secondary-foreground border-2 hover:bg-white/80"
                >
                    Download Invoice
                </Button>
                <Button  className="bg-white text-secondary-foreground border-2 hover:bg-white/80">
                    Email Receipt
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackAndInvoice;
