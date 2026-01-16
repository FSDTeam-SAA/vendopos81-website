import { useQuery } from "@tanstack/react-query";
import { order } from "../api/order";

export function useOrder(paid: string, unpaid: string) {
  return useQuery({
    queryKey: ["orders", paid, unpaid],
    queryFn: () => order(paid, unpaid),
    enabled: !!paid || !!unpaid, // optional safety
  });
}
