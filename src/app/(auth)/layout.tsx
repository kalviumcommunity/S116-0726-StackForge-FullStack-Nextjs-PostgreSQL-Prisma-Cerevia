import { type ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-black font-sans antialiased text-foreground">
      {/* Subtle floating background ambient glow rings */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Split-pane card container */}
      <div className="w-full max-w-md md:max-w-5xl h-auto md:h-[650px] overflow-hidden rounded-none border border-border bg-card shadow-2xl flex flex-col md:flex-row relative z-10">
        
        {/* Animated Fluid Canvas Left Column */}
        <AuthLeftPanel />

        {/* Form Input Right Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-16 md:p-12 overflow-y-auto bg-card relative z-10">
          
          {/* Mobile Logo Branding (visible only on mobile screen widths) */}
          <div className="flex md:hidden flex-col items-center mb-6 select-none">
            <Logo showText={true} />
            <span className="text-[9px] text-primary/80 font-medium uppercase tracking-[0.2em] font-sans mt-2">
              Bespoke Syllabus Engine
            </span>
          </div>

          {/* Children views: LoginForm / RegisterForm / ForgotPasswordForm / ResetPasswordForm */}
          {children}
        </div>
      </div>
    </div>
  );
}
