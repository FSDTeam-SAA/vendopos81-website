import type { AxiosError } from 'axios';
import api from './api';

export async function regesterSupplier(data: FormData) {
  try {
    const res = await api.post(`/join-as-supplier/join`, data);
    return res.data;
  } catch (error) {
    // Preserve and rethrow the original AxiosError so callers can inspect response.data
    if ((error as AxiosError).isAxiosError) throw error;
    // For non-Axios errors, throw a plain Error
    if (error instanceof Error)
      throw new Error(error.message || 'Something wrong please try again');
    throw new Error('Something wrong please try again');
  }
}
