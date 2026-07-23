import { type Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | Cerevia AI Education',
  description: 'Sign in to Cerevia to access your interactive coding sandboxes, AI mentoring, and learning streaks.',
};

export default function LoginPage() {
  return <LoginForm />;
}
