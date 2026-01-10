
import { CartItem } from "@/lib/types/cart";
import CartItemComponent from "../common/CartItem";
import OrderSummary from "../common/OrderSummary";



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
    <section className="container mx-auto grid grid-cols-12 gap-6">
      {/* Cart Items */}
      <div className="col-span-8 space-y-4">
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
