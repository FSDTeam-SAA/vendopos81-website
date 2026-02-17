"use client";

import { useDecreaseQuantity, useFetchCartData, useIncreaseQuantity, useRemoveCartItem } from "@/lib/hooks/cart";
import { calculateCartTotal } from "@/lib/types/cart";

import CartPresenter from "./CartPresenter";
import { useState } from "react";
import { CheckoutFormData } from "../order/orderCheckout/OrderCheckoutModal";
import { useCreateOrder, usePayment } from "@/lib/hooks/useOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CartContainer = () => {
  const router = useRouter();
  const { data: cartResponse, isLoading, isError } = useFetchCartData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: increaseQty } = useIncreaseQuantity();
  const { mutate: decreaseQty } = useDecreaseQuantity();
  const { mutate: removeItem } = useRemoveCartItem();
  const { mutate: createOrder, isPending: isPlacingOrder } = useCreateOrder();
  const { mutate: payment } = usePayment();


  const cartItems = cartResponse?.data || [];

  // Calculate totals
  const subtotal = calculateCartTotal(cartItems);
  const shipping = 0; 
  const tax = 0;
  const total = subtotal + shipping + tax;

  if (isLoading) return <div className="p-10 text-center">Loading cart...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading cart</div>;

  const handleSubmit = (formData: CheckoutFormData) => {
    const items = cartItems.map(item => {
      const itemData:{productId:string,quantity:number,variantId?:string,wholesaleId?:string} = {
        productId: item.product?._id,
        quantity: item.quantity,
      };
      if (item.variant?._id) itemData.variantId = item.variant._id;
      if (item.wholesale?._id) itemData.wholesaleId = item.wholesale._id;
      return itemData;
    });

    const payload = {
      orderType: "single",
      paymentType: formData.paymentMethod,
      items: items,
      billingInfo: {
        name: formData.name,
        email: formData.mail,
        phone: formData.phoneNumber,
        address: formData.from, // Using 'from' field as address
        city: formData.city,
        country: formData.country,
      },
    };

  createOrder(payload, {
  onSuccess: (data) => {
    toast.success("Order placed successfully!");
    setIsModalOpen(false);

    const orderId = data?.data?._id;

    if (orderId && formData.paymentMethod !== "cod") {
      payment(
        {
          orderId
        },
        {
          onSuccess: (res) => {
       
            if (res?.data?.checkoutUrl) {
              window.location.href = res.data.checkoutUrl;
            }else {
              toast.error("Payment initiation failed. Please try again.");
            }
          },
          onError: (error) => {
            console.error("Payment error:", error);
            toast.error("Payment failed. Please try again.");
          },
        }
      );
    }

    if (formData.paymentMethod === "cod") {
      router.push("/payment/success");
    }
  },

  onError: (error) => {
    toast.error("Failed to place order. Please try again.");
    console.error("Order error:", error);
  },
});

  };

  

  return (
    <CartPresenter 
        items={cartItems}
        increaseQty={(id) => increaseQty(id)}
        decreaseQty={(id) => decreaseQty(id)}
        removeItem={(id) => removeItem(id)}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onHandleSubmit={handleSubmit}
        isPlacingOrder={isPlacingOrder}
    />
  );
};

export default CartContainer;
