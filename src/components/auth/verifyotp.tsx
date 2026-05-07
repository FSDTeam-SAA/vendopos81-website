/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useResendOtpForForgotPassword, useVerifyOtp } from '@/lib/hooks/useAuth';
import { VerifyOtp } from '@/lib/types/auth';

export default function VerifyOTP() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otpValue, setOtpValue] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60);

  const { verifyOtpMutation } = useVerifyOtp();

  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const mode = (searchParams.get('mode') as 'register' | 'forgot') || 'register';

  const { mutate: resendOtpForForgotPassword, isPending: isResendOtpLoading } =
    useResendOtpForForgotPassword();

  // Load email
  useEffect(() => {
    if (typeof window !== 'undefined' && mode === 'forgot') {
      const storedEmail = localStorage.getItem('userEmail');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedEmail) setEmail(storedEmail);
    }
  }, [mode]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const form = useForm({ defaultValues: { otp: '' } });

  // =========================
  // OTP CHANGE (single digit)
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;

    const newOtp = [...otpValue];
    newOtp[index] = val;
    setOtpValue(newOtp);

    if (index < 5) inputRefs.current[index + 1]?.focus();
  };

  // =========================
  // BACKSPACE
  // =========================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otpValue];
      newOtp[index] = '';
      setOtpValue(newOtp);

      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  // =========================
  // ✅ FIXED: PASTE HANDLER
  // =========================
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    if (!pastedData) return;

    const newOtp = Array(6).fill('');

    pastedData.split('').forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtpValue(newOtp);

    // focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  // Submit OTP
  const onSubmitOtp = () => {
    const otp = otpValue.join('');
    if (otp.length < 6) return toast.warning('Please enter a complete 6-digit OTP');

    setLoading(true);

    const payload: VerifyOtp = { otp, email: email || '', token };

    if (mode === 'forgot' && !email) {
      toast.error('Email not found. Please try again.');
      setLoading(false);
      return;
    }

    verifyOtpMutation.mutate(payload, {
      onSuccess: (res) => {
        const token = res?.data?.accessToken;

        setOtpValue(Array(6).fill(''));
        form.reset();

        toast.success(res.message || 'OTP verified successfully');

        if (token) router.push(`/reset-your-password?token=${token}`);
        else toast.error('Reset token not received');
      },
      onError: (err: any) => {
        toast.error(err?.message || 'OTP verification failed');
      },
      onSettled: () => setLoading(false),
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center flex-col gap-5 px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl bg-white rounded-xl shadow-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={50}
            height={50}
            className="w-10 sm:w-12 md:w-14 h-auto"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-primary text-2xl sm:text-3xl md:text-[40px] font-bold mb-2 text-center">
          Enter OTP
        </h1>

        <p className="text-gray-500 mb-6 text-center text-sm sm:text-base">
          We’ve sent a 6-digit code to your email:{' '}
          <span className="font-semibold text-[#131313]">{email}</span>
        </p>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitOtp();
            }}
          >
            <FormField
              control={form.control}
              name="otp"
              render={() => (
                <FormItem>
                  <div className="flex justify-between gap-2 sm:gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otpValue[index] || ''}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        className="h-12 w-10 sm:h-14 sm:w-12 md:h-16 md:w-14 text-center text-lg sm:text-xl md:text-2xl font-bold border-gray-300 focus:ring-2 focus:ring-primary"
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined} // ✅ FIXED
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timer + Resend */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-gray-500 my-4 sm:my-6">
              <div className="flex items-center gap-1">
                <span>⏱</span>
                <span>
                  {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                  {String(timeLeft % 60).padStart(2, '0')}
                </span>
              </div>

              <div>
                Didn’t get a code?{' '}
                <button
                  type="button"
                  disabled={timeLeft > 0 || isResendOtpLoading}
                  className={`${
                    timeLeft > 0 || isResendOtpLoading
                      ? 'text-primary cursor-not-allowed'
                      : 'text-primary hover:underline cursor-pointer'
                  }`}
                  onClick={() => {
                    resendOtpForForgotPassword(email || '', {
                      onSuccess: (data: any) => {
                        toast.success(data?.message || 'OTP resent successfully!');
                        setTimeLeft(60);
                      },
                      onError: (err: any) => {
                        toast.error(err?.message || 'Failed to resend OTP');
                      },
                    });
                  }}
                >
                  {isResendOtpLoading ? 'Sending...' : 'Resend'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/80 text-white h-11 sm:h-12 w-full rounded-md text-sm sm:text-base font-semibold flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
