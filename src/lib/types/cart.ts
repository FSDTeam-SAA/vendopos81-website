export interface Image {
  public_id: string;
  url: string;
  _id: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  images: Image[];
  // priceFrom is optional since it's not in the new response
  priceFrom?: number;
}

export interface Variant {
  _id: string;
  label: string;
  price: number;
  discount: number;
  unit: string;
}

export interface Wholesale {
  _id: string;
  type: string;
  label: string;
}

export interface CartItem {
  _id: string;
  userId: string;
  product: Product; // Changed from productId
  // variantId is removed as it's not in the response
  variant: Variant | null;
  wholesale: Wholesale | null; // Changed from wholesaleId
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: CartItem[];
  meta: Meta;
}

// Helper functions remain the same
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateTotalItems = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// You can also export a type for the entire cart state if needed
export type CartState = CartResponse;