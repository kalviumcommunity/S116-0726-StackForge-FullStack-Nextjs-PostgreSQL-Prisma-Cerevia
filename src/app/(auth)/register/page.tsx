import { type Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up | Cerevia',
  description: 'Create your Cerevia account to start your learning streaks.',
};

export default function RegisterPage() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Visual glow on card */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-2 text-center mb-8 relative z-10">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="text-xs text-muted-foreground">
          Enter your details below to create your account and start learning
        </p>
      </div>

      {/* Renders the client-side register form */}
      <RegisterForm />
    </div>
  );
}
