import { ApiResponse } from '@/types';

class ApiClient {
  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  private async request<T>(
    path: string,
    options: RequestInit & { timeoutMs?: number; retries?: number } = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.getBaseUrl()}${path}`;
    const headers = new Headers(options.headers);

    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (typeof window !== 'undefined' && !headers.has('Authorization')) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    // Check offline status
    if (typeof window !== 'undefined' && !navigator.onLine) {
      return {
        success: false,
        error: {
          code: 'OFFLINE',
          message: 'You are currently offline. Please check your internet connection.',
        },
      };
    }

    const timeoutMs = options.timeoutMs ?? 15000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const signal = options.signal ? options.signal : controller.signal;

    const maxRetries = options.retries ?? (options.method === 'GET' ? 1 : 0);
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const response = await fetch(url, {
          ...options,
          headers,
          signal,
        });

        clearTimeout(timer);

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { message: `HTTP Error: ${response.status} ${response.statusText}` };
          }

          // Handle 401 Unauthorized globally
          if (response.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }

          // Retry 503 or 504 once if GET
          if ((response.status === 503 || response.status === 504) && attempt < maxRetries) {
            attempt++;
            await new Promise((res) => setTimeout(res, 500));
            continue;
          }

          return {
            success: false,
            error: {
              code: errorData.code || `HTTP_${response.status}`,
              message: errorData.message || 'An unexpected server error occurred.',
              details: errorData.details,
            },
          };
        }

        const data = await response.json();
        return {
          success: true,
          data: data as T,
        };
      } catch (error) {
        clearTimeout(timer);

        if (error instanceof Error && error.name === 'AbortError') {
          return {
            success: false,
            error: {
              code: 'TIMEOUT',
              message: 'Request timed out. Please try again.',
            },
          };
        }

        if (attempt < maxRetries) {
          attempt++;
          await new Promise((res) => setTimeout(res, 500));
          continue;
        }

        return {
          success: false,
          error: {
            code: 'NETWORK_ERROR',
            message: error instanceof Error ? error.message : 'A network connection issue occurred.',
          },
        };
      }
    }

    return {
      success: false,
      error: {
        code: 'MAX_RETRIES_EXCEEDED',
        message: 'Failed to complete request after retries.',
      },
    };
  }

  public get<T>(path: string, options?: Omit<RequestInit, 'method'> & { timeoutMs?: number; retries?: number }) {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  public post<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body'> & { timeoutMs?: number }) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body'> & { timeoutMs?: number }) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(path: string, options?: Omit<RequestInit, 'method'> & { timeoutMs?: number }) {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
export default api;
