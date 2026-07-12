import { type ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-background font-sans antialiased text-foreground">
      {/* Decorative subtle background design grid & glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[700px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Centered logo above the container card */}
      <div className="mb-6 flex flex-col items-center select-none">
        <Logo showText={true} />
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 font-semibold font-mono">
          Gamification Platform
        </span>
      </div>

      {/* Main container children */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
