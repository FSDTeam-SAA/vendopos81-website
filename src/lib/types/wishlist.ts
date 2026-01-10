import { Product, Meta } from "./product";

export interface WishlistItem {
  _id: string;
  userId: string;
  productId: Product;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: WishlistItem[];
  meta: Meta;
}
