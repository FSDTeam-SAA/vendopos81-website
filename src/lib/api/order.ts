import api from "./api";

export async function order(paid: string, unpaid: string) {
  try {
    const res = await api.get(
      `/order/my-orders?paid=${paid}&unpaid=${unpaid}`
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch orders");
    }
    throw new Error("An unexpected error occurred");
  }
}
