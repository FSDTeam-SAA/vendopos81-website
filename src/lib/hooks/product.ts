'use client'
import { useQuery } from "@tanstack/react-query";
import { FeatureProduct } from "../api/api";
import { ProductParams } from "../types/params";


export function useFetchAllProduct(params?: ProductParams) {
  return useQuery({
    queryKey: ["allProduct", params], // params included for cache
    queryFn: () => FeatureProduct(params),
  });
}