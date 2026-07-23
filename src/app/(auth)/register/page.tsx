import { type Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account | Cerevia AI Education',
  description: 'Join Cerevia to master software engineering, full stack development, and AI tools with hands-on practice.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
