/* eslint-disable @typescript-eslint/no-explicit-any */
// interfaces/TopRatedProduct.ts

export interface Image {
  public_id: string;
  url: string;
  _id: string;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
}

export interface Category {
  _id: string;
  region: string;
  slug: string;
}

export interface Supplier {
  _id: string;
  shopName: string;
  brandName: string;
}

export interface Variant {
  label: string;
  price: number;
  stock: number;
  unit: string;
  discount?: number;
  discountPrice?: number;
  _id: string;
}

export interface PalletItemProduct {
  productId: string;
  caseQuantity?: number;
  _id: string;
}

export interface PalletItem {
  palletName: string;
  items: PalletItemProduct[];
  totalCases: number;
  price: number;
  estimatedWeight: number;
  isMixed: boolean;
  isActive: boolean;
  _id: string;
}

export interface CaseItem {
  productId: string;
  quantity: number;
  price: number;
  discount?: number;
  isActive: boolean;
  _id: string;
}

export interface WholesaleItem {
  _id: string;
  type: 'pallet' | 'case' | 'fast-moving';
  label: string;
  palletItems: PalletItem[];
  caseItems: CaseItem[];
  fastMovingItems: any[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TopRatedProduct {
  _id: string;
  userId: string;
  categoryId: Category;
  supplierId: Supplier;
  title: string;
  slug: string;
  shortDescription: string;
  showOnlyDiscount: number;
  description: string;
  images: Image[];
  productType: string;
  productName: string;
  variants: Variant[];
  priceFrom: number;
  shelfLife: string;
  originCountry: string;
  isHalal: boolean;
  isOrganic: boolean;
  isFrozen: boolean;
  isKosher: boolean;
  isVendorBrand?: boolean;
  seo: SEO;
  averageRating: number;
  totalRatings: number;
  status: 'approved' | 'pending' | 'rejected';
  isFeatured: boolean;
  quantity: number;
  isAvailable: boolean;
  wholesaleId: WholesaleItem[];
  addBy: 'supplier' | 'admin';
  createdAt: string;
  updatedAt: string;
  isCase: boolean;
  isPallet: boolean;
}

export interface TopRatedProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: TopRatedProduct[];
}

// You can also create a union type if needed with HomeFeatureProduct
export type Product = TopRatedProduct; // Or create a base product interface