'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, Mail, Lock, User as UserIcon, ArrowRight, AlertCircle, Sparkles, Check } from 'lucide-react';
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
const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms & conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-zinc-800' };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score: 66, label: 'Medium', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

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
              setSubmitError(err instanceof Error ? err.message : 'Google registration failed');
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
            text: 'signup_with',
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
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const currentPassword = watch('password', '');
  const strength = getPasswordStrength(currentPassword);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected registration error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-md mx-auto w-full">
      
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
          <span>Join Cerevia Community</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Create Account
        </h1>
        <p className="text-xs text-zinc-400">
          Unlock interactive coding sandboxes, AI mentoring, and career roadmaps.
        </p>
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3.5 text-xs text-rose-400 flex items-start gap-2.5 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold">Registration Failed</span>
            <span className="text-[11px] text-rose-300">{submitError}</span>
          </div>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        
        {/* Full Name field */}
        <div className="space-y-1">
          <label htmlFor="fullName" className="text-xs font-semibold text-zinc-200">
            Full Name
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="fullName"
              type="text"
              placeholder="Aarav Sharma"
              disabled={isLoading}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={cn(
                'flex h-10 w-full rounded-xl border bg-zinc-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50',
                errors.fullName ? 'border-rose-500/80 focus-visible:ring-rose-500' : 'border-zinc-800 focus:border-zinc-700'
              )}
              {...register('fullName')}
            />
          </div>
          {errors.fullName && (
            <p id="fullName-error" className="text-[11px] font-medium text-rose-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address field */}
        <div className="space-y-1">
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
                'flex h-10 w-full rounded-xl border bg-zinc-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50',
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

        {/* Password field */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-xs font-semibold text-zinc-200">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              disabled={isLoading}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={cn(
                'flex h-10 w-full rounded-xl border bg-zinc-900/90 pl-10 pr-11 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50',
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
          
          {/* Password Strength Meter */}
          {currentPassword && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400">
                <span>Password Strength:</span>
                <span className={cn(
                  strength.label === 'Weak' ? 'text-rose-400' : strength.label === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                )}>
                  {strength.label}
                </span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={cn('h-full transition-all duration-300', strength.color)}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}

          {errors.password && (
            <p id="password-error" className="text-[11px] font-medium text-rose-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password field */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-xs font-semibold text-zinc-200">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              disabled={isLoading}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              className={cn(
                'flex h-10 w-full rounded-xl border bg-zinc-900/90 pl-10 pr-11 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50',
                errors.confirmPassword ? 'border-rose-500/80 focus-visible:ring-rose-500' : 'border-zinc-800 focus:border-zinc-700'
              )}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 focus-visible:outline-none p-1 rounded-md"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-[11px] font-medium text-rose-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="space-y-1 pt-1">
          <div className="flex items-start gap-2 select-none">
            <input
              id="terms"
              type="checkbox"
              disabled={isLoading}
              className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 transition-colors cursor-pointer accent-blue-600 shrink-0"
              {...register('terms')}
            />
            <label htmlFor="terms" className="text-[11px] text-zinc-400 leading-tight cursor-pointer">
              I agree to Cerevia&apos;s{' '}
              <a href="#" className="text-white underline underline-offset-2 hover:text-blue-400">Terms of Service</a> and{' '}
              <a href="#" className="text-white underline underline-offset-2 hover:text-blue-400">Privacy Policy</a>.
            </label>
          </div>
          {errors.terms && (
            <p className="text-[11px] font-medium text-rose-400">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Register Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 transform hover:-translate-y-0.5 mt-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-zinc-800" />
        <span className="flex-shrink mx-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
          or sign up with
        </span>
        <div className="flex-grow border-t border-zinc-800" />
      </div>

      {/* Google Sign Up Button */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div id="google-signin-btn" className="w-full flex justify-center min-h-[40px] z-20" />
      </div>

      {/* Redirect back to Login */}
      <p className="text-center text-xs text-zinc-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-bold text-white hover:text-blue-400 transition-colors underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>

    </div>
  );
}
