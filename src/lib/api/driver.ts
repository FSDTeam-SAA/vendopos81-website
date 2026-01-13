import api from "./api";

export async function registerDriver(data: FormData) {
  try {
    const res = await api.post(`/driver/register-unified`, data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something wrong please try again");
    }
  }
}
