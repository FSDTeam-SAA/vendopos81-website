"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  forgetPassword,
  getMyProfile,
  registerUser,
  verifyEmail,
  verifyOtp,
} from "../api/api";
import { VerifyOtp } from "../types/auth";

// useAuth Hook
// --------------------

export function useRegester() {
  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  return {
    registerMutation,
  };
}

export function useEmailVerify() {
  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
  });

  return { verifyEmailMutation };
}

export function useForgotPassword() {
  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
  });

  return { forgetPasswordMutation };
}
export function useVerifyOtp() {
  const verifyOtpMutation = useMutation({
    mutationFn: (data: VerifyOtp) => verifyOtp(data),
  });
  return { verifyOtpMutation };
}
//

export function useGetMyProfile(token?: string) {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfile({ token: token! }),
    enabled: !!token,
  });
}