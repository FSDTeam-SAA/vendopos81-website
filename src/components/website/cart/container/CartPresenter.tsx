
import { CartItem } from "@/lib/types/cart";
import CartItemComponent from "../common/CartItem";
import OrderSummary from "../common/OrderSummary";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";



interface Props {
  items: CartItem[];
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartPresenter = ({
  items,
  increaseQty,
  decreaseQty,
  removeItem,
  subtotal,
  shipping,
  tax,
  total,
}: Props) => {
  return (
    <section className="container mx-auto grid grid-cols-12 gap-6 py-10">
      {/* Cart Items */}
      <div className="col-span-8">
      <div >
        <Link href={'/shop'} className=" flex gap-2 items-center text-primary mb-10 mt-7.5">
          <MoveLeftIcon /> Continue Shopping
        </Link>
      </div>

      <div className=" space-y-4">

        {items.map(item => (
          <CartItemComponent
            key={item._id}
            item={item}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
          />
        ))}
      </div>
      </div>

      {/* Order Summary */}
      <div className="col-span-4">
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>
    </section>
  );
};

export default CartPresenter;
