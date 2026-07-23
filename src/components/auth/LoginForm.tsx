'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}

// Validation schema using Zod
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '102983748293-dummyclientid.apps.googleusercontent.com',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: async (response: any) => {
            setIsLoading(true);
            setSubmitError(null);
            try {
              await loginWithGoogle(response.credential);
            } catch (err) {
              setSubmitError(err instanceof Error ? err.message : 'Google authentication failed');
            } finally {
              setIsLoading(false);
            }
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          { 
            theme: 'filled_black', 
            size: 'large', 
            width: 340,
            text: 'signin_with',
            shape: 'pill',
          }
        );
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [loginWithGoogle]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      await login({ email: data.email, password: data.password });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-md mx-auto w-full">
      
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
          <Shield className="h-3.5 w-3.5" />
          <span>Secure Sign In</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-xs text-zinc-400">
          Enter your registered email and password to access your Cerevia workspace.
        </p>
      </div>

      {/* Authentication Failure Error Banner */}
      {submitError && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3.5 text-xs text-rose-400 flex items-start gap-2.5 backdrop-blur-md animate-shake">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold">Authentication Failed</span>
            <span className="text-[11px] text-rose-300">{submitError}</span>
          </div>
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email Address Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-zinc-200">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="email"
              type="email"
              placeholder="student@cerevia.edu"
              autoComplete="email"
              disabled={isLoading}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={cn(
                'flex h-11 w-full rounded-xl border bg-zinc-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50',
                errors.email ? 'border-rose-500/80 focus-visible:ring-rose-500' : 'border-zinc-800 focus:border-zinc-700'
              )}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-[11px] font-medium text-rose-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold text-zinc-200">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={cn(
                'flex h-11 w-full rounded-xl border bg-zinc-900/90 pl-10 pr-11 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50',
                errors.password ? 'border-rose-500/80 focus-visible:ring-rose-500' : 'border-zinc-800 focus:border-zinc-700'
              )}
              {...register('password')}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 focus-visible:outline-none p-1 rounded-md"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-[11px] font-medium text-rose-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2 select-none py-1">
          <input
            id="rememberMe"
            type="checkbox"
            disabled={isLoading}
            className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 transition-colors cursor-pointer accent-blue-600"
            {...register('rememberMe')}
          />
          <label
            htmlFor="rememberMe"
            className="text-xs text-zinc-400 font-medium cursor-pointer"
          >
            Remember me on this device
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-zinc-800" />
        <span className="flex-shrink mx-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
          or continue with
        </span>
        <div className="flex-grow border-t border-zinc-800" />
      </div>

      {/* Google OAuth Button Container */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div id="google-signin-btn" className="w-full flex justify-center min-h-[40px] z-20" />
      </div>

      {/* Register Redirect Link */}
      <p className="text-center text-xs text-zinc-400 mt-2">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-bold text-white hover:text-blue-400 transition-colors underline underline-offset-4"
        >
          Create account
        </Link>
      </p>

    </div>
  );
}
