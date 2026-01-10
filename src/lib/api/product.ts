// /product/all?search=Red Palm Oil&region=Middle Africa&page=1&limit=5&productType=Hot Sauces&minPrice=&maxPrice=

import { ProductParams } from "../types/product";
import api from "./api";

export async function FeatureProduct(params?: ProductParams) {
  try {
    const query = new URLSearchParams();

    if (params?.search) query.append("search", params.search);
    if (params?.region) query.append("region", params.region);
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.productType) query.append("productType", params.productType);
    if (params?.minPrice) query.append("minPrice", String(params.minPrice));
    if (params?.maxPrice) query.append("maxPrice", String(params.maxPrice));

    const url = `/product/all/${query.toString() ? `?${query}` : ""}`;

    const res = await api.get(url);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch products");
    }
  }
}
