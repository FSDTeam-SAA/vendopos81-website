import api from "./api";

export async function getCategoryData() {
  const res = await api.get("/category/get-all");
  return res.data;
}
    