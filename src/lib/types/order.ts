/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface BillingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  // From your data, there's likely more fields (the "…" indicates truncated data)
  // You might want to add common billing fields:
  country?: string;
  state?: string;
  postalCode?: string;
}

export interface OrderItem {
  // Based on typical order items structure, add specific properties:
  productId?: string;
  name?: string;
  quantity?: number;
  price?: number;
  total?: number;
  variant?: any;
  // Keep this for any additional dynamic properties
  [key: string]: any;
}

export interface Order {
  _id: string;
  userId: User;
  billingInfo: BillingInfo;
  items: OrderItem[];
  orderStatus: 'pending' | 'processing' | 'completed' | 'cancelled' | string; // string allows for future statuses
  orderType: 'single' | 'subscription' | 'bulk' | string; // string allows for future types
  orderUniqueId: string;
  paymentStatus: 'unpaid' | 'paid' | 'refunded' | 'failed' | string; // string allows for future statuses
  paymentType: 'cod' | 'card' | 'paypal' | 'bank' | string; // string allows for future types
  purchaseDate: string; // ISO 8601 format: "2026-01-14T19:58:43.346Z"
  totalPrice: number;
  // You might want to add other common order fields:
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
  shippingInfo?: any;
  discount?: number;
  tax?: number;
  shippingCost?: number;
}

// Main response interface that matches your data structure exactly
export interface OrdersResponse {
  // If your data is an array with index keys
  0: Order;
  length: number;
  // Allow numeric indexing
  [index: number]: Order;
}

// Alternative: If your data is just an array of orders
export type OrderList = Order[];

// For paginated responses (common in APIs)
export interface PaginatedOrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// If you want to be more strict with status enums
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export enum PaymentType {
  COD = 'cod',
  CARD = 'card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank'
}

export enum OrderType {
  SINGLE = 'single',
  SUBSCRIPTION = 'subscription',
  BULK = 'bulk'
}

// Optional: Use strict types with enums
export interface StrictOrder {
  _id: string;
  userId: User;
  billingInfo: BillingInfo;
  items: OrderItem[];
  orderStatus: OrderStatus;
  orderType: OrderType;
  orderUniqueId: string;
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
  purchaseDate: string;
  totalPrice: number;
}

// Helper type for creating new orders
export interface CreateOrderDTO {
  userId: string;
  billingInfo: Omit<BillingInfo, 'email'> & { email?: string };
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    [key: string]: any;
  }>;
  orderType: Order['orderType'];
  paymentType: Order['paymentType'];
  totalPrice: number;
  notes?: string;
}

// Helper type for updating orders
export interface UpdateOrderDTO {
  orderStatus?: Order['orderStatus'];
  paymentStatus?: Order['paymentStatus'];
  billingInfo?: Partial<BillingInfo>;
  notes?: string;
}