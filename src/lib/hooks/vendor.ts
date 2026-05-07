'use client';
import { extractErrorMessage } from '@/lib/utils/error';
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { regesterSupplier } from '../api/vendor';

/**
 * useVendorRegister
 * - wraps the regesterSupplier mutation with a sane default onError that displays a sonner toast
 * - callers can pass their own UseMutationOptions to override behavior
 */
export function useVendorRegister<
  TData = unknown,
  TError = unknown,
  TVariables = FormData,
  TContext = unknown,
>(
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationKey: ['vendor'],
    mutationFn: (data: TVariables) =>
      regesterSupplier(data as unknown as FormData) as unknown as Promise<TData>,
    onError: ((err: TError, variables: TVariables, context: TContext | undefined) => {
      const message = extractErrorMessage(err, 'Failed to register vendor');
      toast.error('Registration failed', { description: message });
      // call user provided handler if present
      if (options?.onError) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line - forward args to user callback
        options.onError(err, variables, context);
      }
    }) as UseMutationOptions<TData, TError, TVariables, TContext>['onError'],
    ...options,
  });
}
