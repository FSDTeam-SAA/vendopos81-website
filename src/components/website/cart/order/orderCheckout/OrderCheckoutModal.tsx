import React, { useState } from 'react';
import { X } from 'lucide-react';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CheckoutFormData) => void;
  isPending?: boolean;
}

export interface CheckoutFormData {
  name: string;
  from: string;
  city: string;
  mail: string;
  country: string;
  phoneNumber: string;
  paymentMethod: 'cod' | 'online';
}

const OrderCheckoutModal = ({ isOpen, onClose, onSubmit, isPending }: OrderCheckoutModalProps) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    from: '',
    city: '',
    mail: '',
    country: '',
    phoneNumber: '',
    paymentMethod: 'online',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method: 'cod' | 'online') => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="relative bg-white rounded-lg shadow-xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Order Checkout</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* From Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="Pick Up Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Country Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Mail Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
                placeholder="Mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('cod')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="font-medium">Cash On Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('online')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.paymentMethod === 'online'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="font-medium">Online Payment</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutModal;