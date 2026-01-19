"use client";
import { useQuery } from "@tanstack/react-query";
import { FeatureProduct } from "../api/api";
import { ProductParams } from "../types/product";
import { caseDealsProduct, FeatureHomeProduct, SingleProduct, SingleProductReview, topReatedProduct } from "../api/product";

export function useFetchAllProduct(params?: ProductParams) {
  return useQuery({
    queryKey: ["allProduct", params], 
    queryFn: () => FeatureProduct(params),
  });
}

export function useFetchFeatureProduct() {
  return useQuery({
    queryKey: ["FeatureProduct"], 
    queryFn: () => FeatureHomeProduct(),
  });
}


export function useFetchTopRatedProduct() {
  return useQuery({
    queryKey: ["topRatedProduct"], 
    queryFn: () => topReatedProduct(),
  });
}



export function useCaseDealsProduct() {
  return useQuery({
    queryKey: ["caseDealsProduct"], 
    queryFn: () => caseDealsProduct(),
  });
}

export function useSingleProduct(id: string) {
  return useQuery({
    queryKey: ["caseDealsProduct", id], 
    queryFn: () => SingleProduct(id),   
    enabled: !!id, 
  });
}

export function useSingleProductReview(id: string) {
  return useQuery({
    queryKey: ["ProductReview", id], 
    queryFn: () => SingleProductReview(id),
    enabled: !!id, 
  });
}
