export type ProductParams = {
  search?: string;
  region?: string;
  page?: number;
  limit?: number;
  productType?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
};