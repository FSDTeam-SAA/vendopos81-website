import { CartItem } from "@/lib/types/cart";
import CartItemComponent from "../common/CartItem";
import OrderSummary from "../common/OrderSummary";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import OrderCheckoutModal, {
  CheckoutFormData,
} from "../order/orderCheckout/OrderCheckoutModal";

interface Props {
  items: CartItem[];
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onHandleSubmit: (formData: CheckoutFormData) => void;
  isPlacingOrder: boolean;
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
  isModalOpen,
  setIsModalOpen,
  onHandleSubmit,
  isPlacingOrder,
}: Props) => {
  return (
    <section className="container mx-auto grid grid-cols-12 gap-6 py-6 md:py-10 px-4 md:px-0">
      {/* Cart Items */}
      <div className="col-span-12 lg:col-span-8">
        <div>
          <Link
            href={"/shop"}
            className=" flex gap-2 items-center text-primary mb-10 mt-7.5"
          >
            <MoveLeftIcon /> Continue Shopping
          </Link>
        </div>

        <div className=" space-y-4">
          {items.map((item) => (
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
      {
        items.length === 0 && (
          <div className="col-span-12 lg:col-span-8 text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 w-10/12 mx-auto">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/shop" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
              Start Shopping
            </Link>
          </div>
        )
      }
 
      {/* Order Summary */}
      <div className="col-span-12 lg:col-span-4">
        {
          items.length > 0 ?  <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          setIsModalOpen={setIsModalOpen}
        /> : ""

        }

    
      </div>
      <div className="p-8">
        <OrderCheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onHandleSubmit}
          isPending={isPlacingOrder}
        />
      </div>
    </section>
  );
};

export default CartPresenter;
