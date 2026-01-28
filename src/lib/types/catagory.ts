// Cloudinary image type
export interface CloudinaryImage {
  public_id: string;
  url: string;
}

// Product item type
export interface catagoryProduct {
  productImage: CloudinaryImage;
  regionImage?: CloudinaryImage; // Optional because one item doesn't have it
  _id: string;
  region: string;
  slug: string;
  productType: string;
  productName: string[];
  country: string[];
  createdAt: string;
  updatedAt: string;
}

// Meta information for pagination
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// Main API response type
export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: catagoryProduct[];
  meta: Meta;
}

// Alternative if you want more specific naming
export interface CategoryResponse extends ApiResponse {
  data: catagoryProduct[];
}