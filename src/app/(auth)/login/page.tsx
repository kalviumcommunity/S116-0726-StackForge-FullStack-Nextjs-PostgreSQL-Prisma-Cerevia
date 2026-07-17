import { type Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | Cerevia',
  description: 'Log in to your Cerevia account to keep your learning streaks active.',
};

export default function LoginPage() {
  return (
    <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
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
