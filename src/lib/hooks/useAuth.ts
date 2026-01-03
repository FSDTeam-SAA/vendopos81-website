import { authService } from "@/lib/api/auth-service";
import { useState } from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      return await authService.login(credentials);
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      return await authService.register(data);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (data: { email: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await authService.forgotPassword(data);
    } catch (err: any) {
      setError(err.message || "Failed to process request");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, data: { newPassword: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await authService.resetPassword(token, data);
    } catch (err: any) {
      setError(err.message || "Reset password failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyOtp = async (data: { email: string; otp: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await authService.verifyOtp(data);
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyOtp,
    isLoading,
    error,
  };
};
