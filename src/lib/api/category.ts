/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getCategoryData(params?: any) {
  const res = await api.get("/category/get-all", { params });
  return res.data;
}

export const getRegions = async () => {
  const res = await api.get("/category/get-region");
  return res.data;
};

