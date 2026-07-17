import { type Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | Cerevia',
  description: 'Recover access to your Cerevia account.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Password Recovery
        </h2>
        <p className="text-xs text-muted-foreground">
          Enter your email to receive a password reset link
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}

// style: adjust forgot password visual polish step 7

// style: adjust forgot password visual polish step 8

// style: adjust forgot password visual polish step 9

// style: adjust forgot password visual polish step 10

// style: adjust forgot password visual polish step 11

// style: adjust forgot password visual polish step 12

// style: adjust forgot password visual polish step 13

// style: adjust forgot password visual polish step 14

// style: adjust forgot password visual polish step 15

// style: adjust forgot password visual polish step 16

// style: adjust forgot password visual polish step 17

// style: adjust forgot password visual polish step 18

// style: adjust forgot password visual polish step 7

// style: adjust forgot password visual polish step 8

// style: adjust forgot password visual polish step 9

// style: adjust forgot password visual polish step 10

// style: adjust forgot password visual polish step 11

// style: adjust forgot password visual polish step 12

// style: adjust forgot password visual polish step 13

// style: adjust forgot password visual polish step 14

// style: adjust forgot password visual polish step 15

// style: adjust forgot password visual polish step 16

// style: adjust forgot password visual polish step 17

// style: adjust forgot password visual polish step 18
