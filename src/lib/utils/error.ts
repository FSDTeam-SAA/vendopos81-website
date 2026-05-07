import axios from 'axios';

type BackendErrorSource = {
  path?: string;
  message?: string;
};

type BackendErrorShape = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  errorSource?: BackendErrorSource[];
  // allow additional unknown keys without using `any`
  [key: string]: unknown;
};

/**
 * Safely extract an error message from many different error shapes.
 * Preserves the original response.data when present (use getResponseData).
 */
export function extractErrorMessage(error: unknown, fallback = 'Something went wrong') {
  // Axios errors (recommended first)
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as BackendErrorShape | undefined;
    // Prefer structured backend message
    return data?.message || data?.errorSource?.[0]?.message || error.message || fallback;
  }

  // Native Error
  if (error instanceof Error) return error.message || fallback;

  // String errors
  if (typeof error === 'string') return error || fallback;

  // Arbitrary object with message-ish fields
  if (typeof error === 'object' && error !== null) {
    try {
      const e = error as Record<string, unknown>;
      // prefer string-like message keys
      // attempt to read common fields; use unknown casts to satisfy lint rules
      const maybeResponse = e.response as unknown;
      const candidate = (e.message ??
        e.error ??
        e.detail ??
        (typeof maybeResponse === 'object' && maybeResponse !== null
          ? ((maybeResponse as Record<string, unknown>)['data'] as unknown)
          : undefined)) as string | undefined;
      return candidate || JSON.stringify(e) || fallback;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

/**
 * If the error is an AxiosError this returns response.data (preserves backend structure).
 * Otherwise returns undefined.
 */
export function getResponseDataFromError(error: unknown) {
  if (axios.isAxiosError(error)) return error.response?.data;
  // Some code may throw plain objects that already are the response
  if (typeof error === 'object' && error !== null) {
    const e = error as Record<string, unknown>;
    const maybeResponse = e.response as unknown;
    if (typeof maybeResponse === 'object' && maybeResponse !== null) {
      const resp = maybeResponse as Record<string, unknown>;
      return resp.data as unknown;
    }
  }
  return undefined;
}

const helpers = {
  extractErrorMessage,
  getResponseDataFromError,
};

export default helpers;
