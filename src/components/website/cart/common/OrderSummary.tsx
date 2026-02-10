interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  setIsModalOpen: (open: boolean) => void;
}

const OrderSummary = ({ subtotal, shipping, tax, total, setIsModalOpen }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-50">Order Summary</h2>

      <div className="space-y-4 text-sm md:text-base">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Subtotal</span>
          <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Shipping</span>
          <span className="font-bold text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Tax</span>
          <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-black text-primary">
              ${Math.round(total * 100) / 100}
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsModalOpen(true)} 
        className="w-full mt-8 bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98] cursor-pointer"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;