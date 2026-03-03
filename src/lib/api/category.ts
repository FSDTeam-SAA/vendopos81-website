import api from "./api";

export async function getCategoryData() {
  const res = await api.get("/category/get-all");
  return res.data;
}

export const getRegions = async () => {
  const res = await api.get("/category/get-region");
  return res.data;
};
