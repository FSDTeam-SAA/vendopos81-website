/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { AuthResponse, RegisterInput } from "../types/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Define generic response type if not already available
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  
register: async (input: RegisterInput): Promise<AuthResponse> => {
    const res = await fetch(`${baseUrl}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data: AuthResponse = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  },

  resetPassword: async (token: string, data: { newPassword: string }) => {
    const response = await api.post(`/auth/reset-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  verifyOtp: async (data: { email: string; otp: string }) => {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  }
};
