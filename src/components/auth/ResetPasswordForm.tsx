'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Loader } from '@/components/ui/Loader';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Clear any pending redirect if the component unmounts first.
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
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      // Redirect after a short delay
      redirectTimer.current = setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during password reset');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !isSuccess) {
    return (
      <div className="space-y-6 text-center z-10 relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Invalid Reset Link</h3>
          <p className="text-sm text-muted-foreground">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        </div>
        <Link href="/forgot-password" className="block w-full">
          <Button variant="outline" className="w-full">
            Request new link
          </Button>
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center z-10 relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Password Reset</h3>
          <p className="text-sm text-muted-foreground">
            Your password has been successfully reset. Redirecting to login...
          </p>
        </div>
        <Loader className="mx-auto h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
            className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20 flex items-start gap-2">
          <div className="mt-0.5">⚠️</div>
          <p>{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full font-medium"
        disabled={isLoading || !password || !confirmPassword}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Resetting password...
          </>
        ) : (
          'Reset Password'
        )}
      </Button>
    </form>
  );
}
