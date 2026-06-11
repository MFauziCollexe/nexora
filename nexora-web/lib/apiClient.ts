import { getToken } from "@/modules/auth/services/authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  includeAuth?: boolean;
};

type ApiResponse<T> = {
  data?: T;
  message?: string;
  error?: string;
};

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    includeAuth = true,
  } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  // Add authorization header if token exists and includeAuth is true
  if (includeAuth) {
    const token = getToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.message || errorData.error || `HTTP ${response.status}`;
    throw new Error(errorMessage);
  }

  const data: ApiResponse<T> = await response.json();
  return data.data ?? (data as T);
}

// Convenience methods
export const api = {
  get: <T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
