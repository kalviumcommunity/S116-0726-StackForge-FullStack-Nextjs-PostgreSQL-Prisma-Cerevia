'use client';

import { Logo } from '@/components/layout/Logo';
import { usePathname } from 'next/navigation';

export function AuthLeftPanel() {
  const pathname = usePathname();

  const getPanelText = () => {
    switch (pathname) {
      case '/register':
        return {
          title: 'Craft your Journey',
          subtitle: 'Track your learning streaks and rank up in our bespoke platform.',
        };
      case '/forgot-password':
        return {
          title: 'Secure Account Access',
          subtitle: 'Retrieve your account access and get back to your learning streak.',
        };
      case '/reset-password':
        return {
          title: 'Secure Account',
          subtitle: 'Create a new secure password to safeguard your achievements.',
        };
      case '/login':
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Keep your learning streak alive and climb the global leaderboard.',
        };
    }
  };

  const { title, subtitle } = getPanelText();

  return (
    <div className="relative hidden md:flex md:w-1/2 bg-black overflow-hidden flex-col justify-between p-16 text-white select-none group animate-fade-in border-r border-border/10">
      {/* Decorative background grid (CSS-based thin line matrix) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      {/* Ambient luxury golden radial glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(156,122,60,0.05),transparent_50%)] pointer-events-none z-5" />

      {/* Top logo branding */}
      <div className="relative z-10 flex flex-col gap-2.5">
        <Logo showText={true} />
        <span className="text-[9px] text-primary/80 font-sans uppercase tracking-[0.25em] font-light">
          Bespoke Syllabus Engine
        </span>
      </div>

      {/* Middle architectural graphics - high end fine lines */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none">
        <div className="w-48 h-48 border border-primary/10 relative flex items-center justify-center p-4">
          <div className="absolute inset-0 border border-primary/5 scale-95" />
          <div className="w-full h-full border border-primary/20 flex items-center justify-center relative bg-black/40">
            {/* Minimal golden crosshair */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-primary/10 -translate-x-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-primary/10 -translate-y-1/2" />
            <span className="font-serif text-3xl font-light text-primary tracking-widest relative z-10 select-none opacity-80">C</span>
          </div>
        </div>
      </div>

      {/* Bottom typography message */}
      <div className="relative z-10 max-w-sm mt-auto">
        <h2 className="text-4xl font-serif font-light tracking-wide text-white leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-xs text-muted-foreground/80 font-sans font-light leading-relaxed tracking-wider">
          {subtitle}
        </p>
      </div>

      {/* Subtle frame corner indicators */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-primary/20" />
      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-primary/20" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-primary/20" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-primary/20" />
    </div>
  );
}
