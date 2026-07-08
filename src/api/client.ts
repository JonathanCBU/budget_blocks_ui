import { API_BASE, defaultHeaders } from "./config";

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: data?.message ?? `Request failed with status ${res.status}`,
        status: res.status,
      };
    }

    return { data, error: null, status: res.status };
  } catch (err) {
    return {
      data: null,
      error:
        err instanceof Error
          ? err.message
          : "Network error — is the API running?",
      status: 0,
    };
  }
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
