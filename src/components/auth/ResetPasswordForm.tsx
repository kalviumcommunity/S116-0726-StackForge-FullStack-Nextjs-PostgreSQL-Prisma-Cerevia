'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Password strength logic
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

  const strength = getPasswordStrength(password);

  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate password reset request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      redirectTimer.current = setTimeout(() => {
        router.push('/login');
      }, 2500);
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during password reset');
    } finally {
      setIsLoading(false);
    }
  };

  // Invalid Token State
  if (!token && !isSuccess) {
    return (
      <div className="space-y-6 text-center z-10 relative max-w-md mx-auto w-full">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertCircle className="h-8 w-8 text-rose-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white">Invalid Reset Link</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            This password reset link is invalid or has expired. Please request a new recovery link.
          </p>
        </div>
        <Link href="/forgot-password" className="block w-full">
          <button className="w-full h-11 rounded-xl bg-white text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-colors">
            Request New Reset Link
          </button>
        </Link>
      </div>
    );
  }

  // Success State
  if (isSuccess) {
    return (
      <div className="space-y-6 text-center z-10 relative max-w-md mx-auto w-full">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-bounce">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white">Password Reset Complete</h3>
          <p className="text-xs text-zinc-400">
            Your password has been successfully updated. Redirecting to sign in...
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-md mx-auto w-full">
      
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Account Hardening</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs text-zinc-400">
          Create a new, strong password to secure your Cerevia account.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3.5 text-xs text-rose-400 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* New Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-xs font-semibold text-zinc-200">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pl-10 pr-11 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400">
                <span>Strength:</span>
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
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-xs font-semibold text-zinc-200">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
              className="flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pl-10 pr-11 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading || !password || !confirmPassword}
          className="group relative flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 transform hover:-translate-y-0.5 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
              <span>Resetting Password...</span>
            </>
          ) : (
            <>
              <span>Update Password</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

    </div>
  );
}
