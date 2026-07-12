import { type Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | Cerevia',
  description: 'Log in to your Cerevia account to keep your learning streaks active.',
};

export default function LoginPage() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Visual glow on card */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-2 text-center mb-8 relative z-10">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-xs text-muted-foreground">
          Enter your credentials to continue your learning streak
        </p>
      </div>

      {/* Renders the client-side login form */}
      <LoginForm />
    </div>
  );
}
