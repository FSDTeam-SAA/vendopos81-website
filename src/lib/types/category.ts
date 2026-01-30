export interface CategoryImage {
  public_id: string;
  url: string;
}

export interface Category {
  productImage: CategoryImage;
  regionImage?: CategoryImage;
  _id: string;
  region: string;
  slug: string;
  productType: string;
  productName: string[];
  country: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Category[];
  meta: Meta;
}

export interface CategoryResponse extends ApiResponse {
  data: Category[];
}
