import api from "./api";

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
  
  register: async (data: any) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  },

  resetPassword: async (token: string, data: { newPassword: string }) => {
    // Assuming the endpoint uses a query param or body. 
    // Usually it's POST /auth/reset-password with token in body or header, 
    // or POST /auth/reset-password/:token
    // Based on typical patterns, let's assume body + header or just body.
    // Given ResetPassword component uses it, let's assume consistent with backend.
    // If unsure, sticking to a common pattern:
    const response = await api.post(`/auth/reset-password`, { ...data, token });
    return response.data;
  },

  verifyOtp: async (data: { email: string; otp: string }) => {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  }
};
