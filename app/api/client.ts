import Cookies from "js-cookie";

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  status?: number;
  error?: any;
  meta?: any;
  data?: T;
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  getToken?: () => string | null;
}

export interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
}

let apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  timeout: 20000,
  getToken: () => Cookies.get("accessToken") ?? null,
};

const DEFAULT_CONFIG = { ...apiConfig };

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions
): Promise<ApiResponse<T>> {
  const url = `${apiConfig.baseURL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = apiConfig.getToken?.();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache || "no-store",
    });

    const responseData = await response.json().catch(() => ({}));

    return {
      success: responseData.success ?? response.ok,
      message: responseData.message,
      status: response.status,
      meta: responseData.meta,
      data: responseData,
      error: responseData.error,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Network Error",
      error,
    };
  }
}

export const apiClient = {
  initialize(config: Partial<ApiConfig>): void {
    apiConfig = { ...DEFAULT_CONFIG, ...config };
  },

  getConfig(): ApiConfig {
    return { ...apiConfig };
  },

  clearCache(url?: string): void {
    if (!url) {
      console.warn("Cache cleared globally (no caching layer implemented)");
    } else {
      console.warn(`Cache cleared for: ${url}`);
    }
  },

  get<T>(
    endpoint: string,
    options: Omit<RequestOptions, "method" | "body"> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { ...options, method: "GET" });
  },

  post<T>(
    endpoint: string,
    data?: unknown,
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { ...options, method: "POST", body: data });
  },

  put<T>(
    endpoint: string,
    data?: unknown,
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { ...options, method: "PUT", body: data });
  },

  patch<T>(
    endpoint: string,
    data?: unknown,
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { ...options, method: "PATCH", body: data });
  },

  delete<T>(
    endpoint: string,
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { ...options, method: "DELETE" });
  },
};
