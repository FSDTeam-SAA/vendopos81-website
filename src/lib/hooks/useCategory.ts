/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getCategoryData, getRegions } from "../api/category";

export function useCategoryData() {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryData(),
  });
}

export function useAllCategory(params?: any) {
  return useQuery({
    queryKey: ["category", params],
    queryFn: () => getCategoryData(params),
  });
}

export const useGetAllRegions = () => {
  return useQuery({
    queryKey: ["allCategory"],
    queryFn: () => getRegions(),
  });
};
