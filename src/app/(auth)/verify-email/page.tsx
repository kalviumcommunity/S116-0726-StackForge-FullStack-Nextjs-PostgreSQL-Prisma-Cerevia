'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    setResendSent(false);

    // Simulate resend API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsResending(false);
    setResendSent(true);
  };

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-md mx-auto w-full text-center">
      
      {/* Icon Badge Animation */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-2xl relative group">
        <Mail className="h-10 w-10 text-blue-400 transition-transform group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Email Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Verify Your Email
        </h1>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
          We sent a verification link to your registered email. Click the link in your email to activate your account.
        </p>
      </div>

      {/* Resend status alert */}
      {resendSent && (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Verification email resent successfully!</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={handleResend}
          disabled={isResending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 hover:bg-zinc-800 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
          <span>{isResending ? 'Resending Link...' : 'Resend Verification Email'}</span>
        </button>

        <Link
          href="/login"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-all shadow-md"
        >
          <span>Continue to Sign In</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

    </div>
  );
}
