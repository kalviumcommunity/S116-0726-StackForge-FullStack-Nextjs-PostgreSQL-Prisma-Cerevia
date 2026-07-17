import { type Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Suspense } from 'react';
import { Loader } from '@/components/ui/Loader';

export const metadata: Metadata = {
  title: 'Reset Password | Cerevia',
  description: 'Set a new password for your Cerevia account.',
};

export default function ResetPasswordPage() {
  return (
    <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Create New Password
        </h2>
        <p className="text-xs text-muted-foreground">
          Your new password must be different from previously used passwords
        </p>
      </div>

      <Suspense fallback={<div className="flex justify-center p-4"><Loader className="h-6 w-6 animate-spin text-primary" /></div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
