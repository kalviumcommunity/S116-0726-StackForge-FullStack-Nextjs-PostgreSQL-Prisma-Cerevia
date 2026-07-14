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
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.getBaseUrl()}${path}`;
    const headers = new Headers(options.headers);

    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP Error: ${response.status} ${response.statusText}` };
        }

        return {
          success: false,
          error: {
            code: errorData.code || 'API_ERROR',
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
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'A network connection issue occurred.',
        },
      };
    }
  }

  public get<T>(path: string, options?: Omit<RequestInit, 'method'>) {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  public post<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body'>) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body'>) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(path: string, options?: Omit<RequestInit, 'method'>) {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
export default api;
