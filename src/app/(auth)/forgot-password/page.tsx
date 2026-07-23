import { type Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | Cerevia AI Education',
  description: 'Recover access to your Cerevia account with a cryptographic password reset link.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
