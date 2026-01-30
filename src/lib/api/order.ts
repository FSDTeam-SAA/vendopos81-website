
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

export async function CreateOrder(data:CreateOrderData ) {
  try {
    const res = await api.post(`/order/create`, data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to Your Order.");
    }
  }
}

export async function payment(data: paymentData) {
  const res = await api.post("/payment/process", data);
  return res.data;
}
