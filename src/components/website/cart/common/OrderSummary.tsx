interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary = ({ subtotal, shipping, tax, total }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold mt-4">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg">
        Order now
      </button>
    </div>
  );
};

export default OrderSummary;
