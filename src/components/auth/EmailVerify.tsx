/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import Image from 'next/image';
import { useEmailVerify, useResendOtpForEmailVerify } from '@/lib/hooks/useAuth';

const formSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your specific OTP must be 6 characters.',
  }),
});

const EmailVerify = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const router = useRouter();

  const { verifyEmailMutation } = useEmailVerify();
  const { mutate: resendOtp, isPending: isResendOtpLoading } = useResendOtpForEmailVerify();

  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otpValue = form.watch('otp');

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  // OTP input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = otpValue.split('');
    while (newOtp.length < 6) newOtp.push('');

    newOtp[index] = value.substring(value.length - 1);
    form.setValue('otp', newOtp.join(''));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    form.setValue('otp', pastedData);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    verifyEmailMutation.mutate(
      { token, otp: values.otp },
      {
        onSuccess: (data) => {
          toast.success(data.message || 'Email verified successfully!');
          router.push('/login');
        },
        onError: (err: any) => {
          toast.error(err.message || 'Failed to verify OTP');
        },
      },
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center flex-col gap-5 px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl bg-white rounded-xl shadow-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={50}
            height={60}
            className="w-10 sm:w-12 md:w-14 h-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-primary text-2xl sm:text-3xl md:text-[40px] font-bold mb-2 text-center">
          Enter OTP
        </h1>

        <p className="text-gray-500 mb-6 text-center text-sm sm:text-base">
          We’ve sent a 6-digit code to your email:
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP Inputs */}
            <FormField
              control={form.control}
              name="otp"
              render={() => (
                <FormItem>
                  <FormControl>
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
                          onPaste={index === 0 ? handlePaste : undefined}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timer + Resend */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-gray-500">
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
                    resendOtp(token, {
                      onSuccess: (data: any) => {
                        toast.success(data?.message || 'OTP resent successfully!');
                        setTimeLeft(30);
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
              disabled={verifyEmailMutation.isPending}
              className="bg-primary hover:bg-primary/50 text-white h-11 sm:h-12 w-full rounded-md text-sm sm:text-base font-semibold flex items-center justify-center"
            >
              {verifyEmailMutation.isPending ? (
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
};

export default EmailVerify;
