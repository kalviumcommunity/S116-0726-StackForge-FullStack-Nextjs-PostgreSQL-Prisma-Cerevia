'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatar: string | null;
  bio: string | null;
  currentStreak: number;
  maxStreak: number;
  totalXP: number;
  currentXP: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { email: string; password: string; fullName: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for cookies
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax; Secure`;
}

function eraseCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchCurrentUser = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      if (data.success && data.data) {
        setUser(data.data);
      } else {
        throw new Error(data.message || 'Invalid user data');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Clear invalid credentials
      eraseCookie('token');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize Auth State from Cookie or LocalStorage
  useEffect(() => {
    const token = getCookie('token') || localStorage.getItem('token');
    if (token) {
      // Sync both storages
      if (!getCookie('token')) setCookie('token', token, 7);
      if (!localStorage.getItem('token')) localStorage.setItem('token', token);
      fetchCurrentUser(token);
    } else {
      setIsLoading(false);
    }
  }, [fetchCurrentUser]);

  // Handle client-side routing protection
  useEffect(() => {
    if (isLoading) return;

    const protectedPaths = ['/dashboard', '/lessons', '/profile', '/leaderboard', '/xp', '/settings'];
    const authPaths = ['/login', '/register'];

    const isProtected = protectedPaths.some(path => pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => pathname.startsWith(path));

    if (isProtected && !user) {
      router.push('/login');
    } else if (isAuthPath && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, pathname, router]);

  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Authentication failed');
    }

    const { token, user: userData } = data.data;

    // Save tokens
    setCookie('token', token, 7);
    localStorage.setItem('token', token);

    setUser(userData);
    router.push('/dashboard');
  };

  const register = async ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, fullName }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    // Auto login after successful registration
    await login({ email, password });
  };

  const logout = useCallback(() => {
    eraseCookie('token');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  }, [router]);

  const refreshUser = useCallback(async () => {
    const token = getCookie('token') || localStorage.getItem('token');
    if (token) {
      await fetchCurrentUser(token);
    }
  }, [fetchCurrentUser]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
