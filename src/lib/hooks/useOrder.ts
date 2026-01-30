"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateOrder, order, payment } from "../api/order";
import { CreateOrderData } from "../types/order";


export function useOrder(params: {
  page?: number | string;
  limit?: number | string;
  orderStatus?: string;
  paymentStatus?: string;
} = {}) {
  const normParams = {
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 10,
    orderStatus: params.orderStatus,
    paymentStatus: params.paymentStatus,
  };

  return useQuery({
    queryKey: ["orders", normParams],
    queryFn: () => order(normParams),
  });
}

export function useOrders(params = {}) {
  return useOrder(params);
}

export function useCreateOrder(){
  return useMutation({
    mutationKey:['createorder'],
    mutationFn:(data:CreateOrderData)=>CreateOrder(data)
  })
}

export function usePayment() {
  return useMutation({
    mutationKey: ["payment"],
    mutationFn: payment,
  });
}
