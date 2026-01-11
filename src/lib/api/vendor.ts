import api from "./api";

export async function regesterSupplier(data: FormData) {
  try {
    const res = await api.post(`/join-as-supplier/join`, data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something wrong please try again");
    }
  }
}
