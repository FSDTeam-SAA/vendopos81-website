export type UserInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type SupplierInfo = {
  _id: string;
  shopName: string;
};

export type ProductInfo = {
  _id: string;
  supplierId: SupplierInfo;
  title: string;
  productType: string;
  productName: string;
};

export type Review = {
  _id: string;
  userId: UserInfo;
  orderId: string;
  productId: ProductInfo;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: Review[];
};