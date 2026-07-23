'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { Sparkles, Code2, Bot, Trophy, CheckCircle2, ShieldCheck } from 'lucide-react';

export function AuthLeftPanel() {
  const pathname = usePathname();

  const getPanelContent = () => {
    switch (pathname) {
      case '/register':
        return {
          title: 'Start Your Future Today.',
          subtitle: 'Join over 20,000+ students mastering software engineering with real-time AI mentoring.',
          image: '/images/auth/register.webp',
          badgeText: 'Free Student Pass',
          statNumber: '150+',
          statLabel: 'Interactive Syllabi',
        };
      case '/forgot-password':
        return {
          title: 'Secure Account Recovery.',
          subtitle: 'Enter your verified email to receive an instant cryptographic password reset link.',
          image: '/images/auth/forgot-password.webp',
          badgeText: 'Zero-Trust Protocol',
          statNumber: '256-bit',
          statLabel: 'AES Encryption',
        };
      case '/reset-password':
        return {
          title: 'Fortify Your Account.',
          subtitle: 'Create a strong, new password to safeguard your achievements and learning progress.',
          image: '/images/auth/reset-password.webp',
          badgeText: 'Password Hardening',
          statNumber: '100%',
          statLabel: 'Account Protection',
        };
      case '/verify-email':
        return {
          title: 'Verify Your Identity.',
          subtitle: 'Check your inbox to confirm your registration and unlock full sandbox privileges.',
          image: '/images/auth/verify-email.webp',
          badgeText: 'Email Verification',
          statNumber: 'Instant',
          statLabel: 'Inbox Delivery',
        };
      case '/login':
      default:
        return {
          title: 'Welcome Back to Cerevia.',
          subtitle: 'Keep your daily learning streak alive, submit code solutions, and climb the leaderboard.',
          image: '/images/auth/login.webp',
          badgeText: 'Daily Streak Active',
          statNumber: '20,000+',
          statLabel: 'Active Learners',
        };
    }
  };

  const { title, subtitle, image, badgeText, statNumber, statLabel } = getPanelContent();

  return (
    <div className="relative hidden md:flex md:w-1/2 bg-zinc-950 overflow-hidden flex-col justify-between p-10 lg:p-14 text-white select-none border-r border-zinc-800/80">
      
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Ambient Gradient Glow Filters */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-500/20 blur-[100px] pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex items-center justify-between">
        <Logo showText={true} />
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-400">
          <Sparkles className="h-3 w-3 fill-amber-400" />
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Center Interactive Visual Card & Floating Badges */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
        
        {/* Main WebP Illustration Container */}
        <div className="relative h-60 w-full max-w-sm rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/80 p-3 shadow-2xl backdrop-blur-xl group">
          <Image
            src={image}
            alt="Cerevia Auth Visual"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

          {/* Floating Card Badge Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-2.5 shadow-xl backdrop-blur-md">
            <div className="h-7 w-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-white">AI Mentor</div>
              <div className="text-zinc-400">Live Code Assistant</div>
            </div>
          </div>

          {/* Floating Card Badge Bottom Left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-2.5 shadow-xl backdrop-blur-md">
            <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="h-4 w-4" />
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-white">{statNumber}</div>
              <div className="text-zinc-400">{statLabel}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Editorial Storytelling Typography */}
      <div className="relative z-10 space-y-2 mt-auto">
        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug">
          {title}
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-md font-normal">
          {subtitle}
        </p>

        {/* Feature bullets */}
        <div className="flex items-center gap-4 pt-3 text-[11px] text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Real-time Evaluation
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> Secure Sessions
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="h-3.5 w-3.5 text-amber-400" /> In-Browser Sandbox
          </span>
        </div>
      </div>

    </div>
  );
}
