'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate password recovery dispatch
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during password recovery');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center z-10 relative max-w-md mx-auto w-full">
        {/* Animated Check Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-bounce">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white">Check Your Email</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We sent a password reset link to <span className="font-bold text-white">{email}</span>. Click the link in the email to reset your password.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button 
            type="button"
            className="w-full h-11 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
            onClick={() => setIsSuccess(false)}
          >
            Try Another Email
          </button>

          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-md mx-auto w-full">
      
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
          <KeyRound className="h-3.5 w-3.5" />
          <span>Password Recovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Forgot Password?
        </h1>
        <p className="text-xs text-zinc-400">
          No worries. Enter your registered email address and we will send you a reset link.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3.5 text-xs text-rose-400 flex items-start gap-2.5">
          <span className="font-bold">Error:</span>
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-zinc-200">
            Registered Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="email"
              type="email"
              placeholder="student@cerevia.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className={cn(
                'flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-50'
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !email}
          className="group relative flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
              <span>Sending Reset Link...</span>
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>

      {/* Redirect back to Login */}
      <div className="text-center pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Sign In</span>
        </Link>
      </div>

    </div>
  );
}
