import { useQuery } from "@tanstack/react-query";
import { getCategoryData } from "../api/category";

export function useCategoryData() {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryData(),
  });
}

export function useAllCategory() {
  return useQuery({
    queryKey: ["allCategory"],
    queryFn: () => getCategoryData(),
  });
}