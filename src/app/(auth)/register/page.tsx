import { type Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up | Cerevia',
  description: 'Create your Cerevia account to start your learning streaks.',
};

export default function RegisterPage() {
  return (
    <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
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
