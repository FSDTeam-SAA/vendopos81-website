import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateOrder, order } from "../api/order";
import { CreateOrderData } from "../types/order";


export function useOrder(paid: string, unpaid: string) {
  return useQuery({
    queryKey: ["orders", paid, unpaid],
    queryFn: () => order(paid, unpaid),
    enabled: !!paid || !!unpaid, // optional safety
  });
}

export function useCreateOrder(){
  return useMutation({
    mutationKey:['createorder'],
    mutationFn:(data:CreateOrderData)=>CreateOrder(data)
  })
}