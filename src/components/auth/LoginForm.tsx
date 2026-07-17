'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
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
            width: 320,
            text: 'signin_with',
            shape: 'rectangular',
          }
        );
      }
    };

    return () => {
      // Clean up script if present in body to avoid multiple inclusions
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [loginWithGoogle]);

  // Form hook definition
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
    <div className="flex flex-col gap-6 relative z-10">
      
      {/* simulated submit error alert banner */}
      {submitError && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex flex-col gap-1">
          <span className="font-semibold">Authentication failure</span>
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email input field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-foreground flex items-center justify-between"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="student@byjus.com"
              autoComplete="email"
              disabled={isLoading}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={cn(
                'flex h-10 w-full rounded-lg border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
                errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-border'
              )}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-[10px] font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password input field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-foreground"
            >
              Password
            </label>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[10px] font-semibold text-primary hover:text-accent transition-colors uppercase tracking-wider"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={cn(
                'flex h-10 w-full rounded-lg border border-input bg-transparent pl-10 pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
                errors.password ? 'border-destructive focus-visible:ring-destructive' : 'border-border'
              )}
              {...register('password')}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none rounded-md"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-[10px] font-medium text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me checkbox */}
        <div className="flex items-center gap-2 select-none py-1">
          <input
            id="rememberMe"
            type="checkbox"
            disabled={isLoading}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 transition-colors accent-primary cursor-pointer disabled:cursor-not-allowed"
            {...register('rememberMe')}
          />
          <label
            htmlFor="rememberMe"
            className="text-[11px] text-muted-foreground font-medium cursor-pointer disabled:cursor-not-allowed"
          >
            Remember me on this device
          </label>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 uppercase tracking-widest text-[11px]"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      {/* Divider line */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-border" />
        <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
          or continue with
        </span>
        <div className="flex-grow border-t border-border" />
      </div>

      {/* Social login buttons */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div id="google-signin-btn" className="w-full flex justify-center min-h-[40px] z-20" />
      </div>

      {/* Redirect back to signup link */}
      <p className="text-center text-[11px] text-muted-foreground mt-2">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-accent transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
