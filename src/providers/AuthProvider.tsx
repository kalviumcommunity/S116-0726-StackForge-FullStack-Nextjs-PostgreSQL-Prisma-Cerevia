'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  avatar: string | null;
  totalXP: number;
  currentXP: number;
  currentStreak: number;
  maxStreak: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, email: string, password: string, avatar?: string | null) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Load authenticated user profile from API
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get<AuthUser>('/api/auth/me');
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        // Token is invalid/expired
        deleteCookie('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      deleteCookie('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check token cookie and retrieve session on mount
  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [fetchUserProfile]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post<{ user: AuthUser; token: string }>('/api/auth/login', {
        email,
        password,
      });

      if (response.success && response.data) {
        const { token, user: userData } = response.data;
        // Save token to cookie (7 days expiry)
        setCookie('token', token, 7);
        setUser(userData);
        setIsAuthenticated(true);
        router.push('/dashboard');
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error?.message || 'Invalid email or password.',
        };
      }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred during login.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    avatar: string | null = null
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthUser>('/api/auth/register', {
        fullName,
        email,
        password,
        avatar,
      });

      if (response.success && response.data) {
        // Success register, log user in automatically for seamless UX
        return await login(email, password);
      } else {
        return {
          success: false,
          error: response.error?.message || 'Registration failed.',
        };
      }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred during registration.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    deleteCookie('token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  // Expose manual refresh logic
  const refreshUser = async () => {
    const token = getCookie('token');
    if (token) {
      try {
        const response = await api.get<AuthUser>('/api/auth/me');
        if (response.success && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch {
        // Ignore silent refresh error
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
