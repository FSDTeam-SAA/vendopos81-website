"use client";

import { useDecreaseQuantity, useFetchCartData, useIncreaseQuantity, useRemoveCartItem } from "@/lib/hooks/cart";
import { CartItem } from "@/lib/types/cart";

import CartPresenter from "./CartPresenter";

const CartContainer = () => {
  const { data: cartResponse, isLoading, isError } = useFetchCartData();
  const { mutate: increaseQty } = useIncreaseQuantity();
  const { mutate: decreaseQty } = useDecreaseQuantity();
  const { mutate: removeItem } = useRemoveCartItem();

  const cartItems = cartResponse?.data || [];

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price ), 0);
  const shipping = 5; 
  const tax = 1; 
  const total = subtotal + shipping + tax;

  if (isLoading) return <div className="p-10 text-center">Loading cart...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading cart</div>;

  return (
    <CartPresenter 
        items={cartItems}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
    />
  );
};

export default CartContainer;
