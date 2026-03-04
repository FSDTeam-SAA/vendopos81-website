/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateOrderData, paymentData } from "../types/order";
import api from "./api";

export async function order(params: {
  page?: number;
  limit?: number;
  orderStatus?: string;
  paymentStatus?: string;
} = {}) {
  try {
    const { page = 1, limit = 5, orderStatus, paymentStatus } = params;
    let url = `/order/my-orders?page=${page}&limit=${limit}`;
    if (orderStatus) url += `&orderStatus=${orderStatus}`;
    if (paymentStatus) url += `&paymentStatus=${paymentStatus}`;
    
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch orders");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function CreateOrder(data: CreateOrderData, token: string) {
  try {
    const res = await api.post(`/order/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("Backend error response:", error?.response?.data);
    throw error;
  }
}

export async function payment(data: paymentData) {
  const res = await api.post("/payment/process", data);
  return res.data;
}
