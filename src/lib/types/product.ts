/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Category Interface - UPDATED
export interface Category {
  _id: string;
  region: string;
  slug?: string; // Added optional since your data doesn't have slug
}

// Supplier Interface - UPDATED (can be string or object based on your data)
export type Supplier = string | {
  _id: string;
  shopName?: string;
  brandName?: string;
  // Add other supplier fields as needed
};

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

// Wholesale Item Interfaces - UPDATED
export interface PalletItem {
  productId: string;
  caseQuantity?: number; // Made optional since not all have it
  _id: string;
}

export interface Pallet {
  palletName: string;
  items: PalletItem[];
  totalCases: number;
  price: number;
  estimatedWeight: number;
  isMixed: boolean;
  isActive: boolean;
  _id: string;
}

export interface CaseItem {
  productId: string;
  quantity?: number;
  price?: number;
  discount?: number;
  isActive?: boolean;
  _id: string;
}

export interface WholesaleItem {
  _id: string;
  type: 'pallet' | 'case' | string; // More specific type
  label: string;
  palletItems?: Pallet[];
  caseItems?: CaseItem[];
  isActive: boolean;
  fastMovingItems: any[];
  createdAt: string;
  updatedAt: string;
}

// Main Product Interface - UPDATED
export interface Product {
  _id: string;
  userId: string;
  categoryId: Category;
  supplierId: Supplier; // Changed to the union type
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  productType: string;
  productName: string;
  variants?: ProductVariant[]; // Optional - only for variant-based products
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
  totalReviews?: number; // Added optional since not in your data
  status: string;
  isFeatured: boolean;
  quantity?: number;
  isAvailable?: boolean;
  wholesaleId?: WholesaleItem[]; // For wholesale products
  addBy: string;
  createdAt: string;
  updatedAt: string;
  isCase?: boolean; // Added from your data
  isPallet?: boolean; // Added from your data
  isVendorBrand?: boolean; // Added from your data
  // Based on your data, these fields are mutually exclusive:
  // - If product has variants, it shouldn't have wholesaleId items (or they're empty)
  // - If product has wholesaleId items, it shouldn't have variants
}

// Type guards to check product type
export function isVariantProduct(product: Product): boolean {
  return !!(product.variants && product.variants.length > 0);
}

export function isWholesaleProduct(product: Product): boolean {
  return !!(product.wholesaleId && product.wholesaleId.length > 0);
}

export function isCaseProduct(product: Product): boolean {
  return product.wholesaleId?.some(item => item.type === 'case') || false;
}

export function isPalletProduct(product: Product): boolean {
  return product.wholesaleId?.some(item => item.type === 'pallet') || false;
}

// Meta/Pagination Interface
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// API Response Interface - UPDATED
export interface ProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product[];
  meta?: Meta; // Made optional since your featured products response doesn't have meta
}

// Query Parameters Interface
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

// Featured Products Response (specific type for your data)
export interface FeaturedProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product[];
  // No meta in your featured products response
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product;
}