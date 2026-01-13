export type ProductParams = {
  search?: string;
  region?: string;
  page?: number;
  limit?: number;
  productType?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  categorySlug?: string;
};

// product interface.....

// Image interface
// types/product.ts

// Image Interface
// lib/types/product.ts

// Image Interface
export interface ProductImage {
  public_id: string;
  url: string;
  _id: string;
}

// SEO Interface
export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
}

// Category Interface
export interface Category {
  _id: string;
  region: string;
  slug: string;
}

// Supplier Interface
export interface Supplier {
  _id: string;
  shopName: string;
  brandName: string;
}

// Variant Interface
export interface ProductVariant {
  label: string;
  price: number;
  stock: number;
  unit: string;
  discount?: number;
  discountPrice?: number;
  _id: string;
}

// Wholesale Item Interface
export interface WholesaleItem {
  _id: string;
  type: string;
  label: string;
  palletItems?: Array<{
    palletName: string;
    items: Array<{
      productId: string;
      caseQuantity: number;
      _id: string;
    }>;
    totalCases: number;
    price: number;
    estimatedWeight: number;
    isMixed: boolean;
    isActive: boolean;
    _id: string;
  }>;
  caseItems?: Array<{
    productId: string;
    quantity?: number;
    price?: number;
    discount?: number;
    isActive?: boolean;
    _id: string;
  }>;
  isActive: boolean;
  fastMovingItems: any[];
  createdAt: string;
  updatedAt: string;
}

// Main Product Interface
export interface Product {
  _id: string;
  userId: string;
  categoryId: Category;
  supplierId: Supplier;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  productType: string;
  productName: string;
  variants?: ProductVariant[];
  priceFrom?: number;
  shelfLife: string;
  originCountry: string;
  isHalal: boolean;
  isOrganic: boolean;
  isFrozen: boolean;
  isKosher: boolean;
  seo: SEO;
  averageRating: number;
  totalRatings: number;
  totalReviews: number;
  status: string;
  isFeatured: boolean;
  quantity?: number;
  isAvailable?: boolean;
  wholesaleId: WholesaleItem[];
  addBy: string;
  createdAt: string;
  updatedAt: string;
}

// Meta/Pagination Interface
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// API Response Interface
export interface ProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product[];
  meta: Meta;
}

// Query Parameters Interface (if you need it)
export interface ProductQueryParams {
  search?: string;
  region?: string;
  page: number;
  limit: number;
  productType?: string;
  status?: string;
  isFeatured?: boolean;
  categorySlug?: string;
}