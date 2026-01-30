// Image type
export interface Image {
  public_id: string;
  url: string;
  _id: string;
}

// User type (nested in order)
export interface OrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Product type (nested in items)
export interface Product {
  _id: string;
  title: string;
  slug: string;
  images: Image[];
}

// Wholesale item type
export interface WholesaleItem {
  quantity: number;
  price: number;
  discount: number;
}

// Wholesale type
export interface Wholesale {
  _id: string;
  type: string;
  label: string;
  item: WholesaleItem;
}

// Variant type
export interface Variant {
  _id: string;
  label: string;
  price: number;
  discount: number;
  unit: string;
}

// Order item type
export interface OrderItem {
  product: Product;
  variant: Variant | null;
  wholesale: Wholesale | null;
  quantity: number;
  unitPrice: number;
}

// Billing info type
export interface BillingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

// Order type
export  interface Order {
  _id: string;
  userId: OrderUser;
  orderType: string;
  paymentType: string;
  paymentStatus: string;
  orderStatus: string;
  totalPrice: number;
  billingInfo: BillingInfo;
  purchaseDate: string;
  items: OrderItem[];
}

// Main response type
export interface OrdersResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Order[];
}