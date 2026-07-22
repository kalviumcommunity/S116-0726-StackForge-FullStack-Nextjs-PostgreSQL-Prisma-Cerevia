'use client';

import Image from 'next/image';
import { Flame, Sparkles, Target, Zap, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

export function WelcomeBanner() {
  const { user } = useAuth();

  const currentXP = user?.totalXP || 0;
  const currentLevel = Math.floor(currentXP / 100) + 1;
  const prevLevelXP = (currentLevel - 1) * 100;
  const xpInCurrentLevel = currentXP - prevLevelXP;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / 100) * 100));

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Background WebP illustration backdrop */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <Image
          src="/images/dashboard/welcome.webp"
          alt="Dashboard Welcome Backdrop"
          fill
          unoptimized
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
      </div>

      {/* Mesh Orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-500/15 blur-[100px]" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left Side Greeting */}
        <div className="space-y-3 max-w-xl">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 fill-blue-400" />
              <span>Level {currentLevel} Scholar</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              <Flame className="h-3.5 w-3.5 fill-amber-400 animate-pulse" />
              <span>{user?.currentStreak || 0} Day Streak</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            {getGreetingTime()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">{user?.fullName?.split(' ')[0] || 'Engineer'}</span>.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            Ready to continue your software development journey? You have unlocked <span className="font-bold text-white">{currentXP} XP</span> and kept your daily streak alive.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all transform hover:-translate-y-0.5"
            >
              <span>Resume Learning</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/xp"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>View XP Breakdown</span>
            </Link>
          </div>

        </div>

        {/* Right Side XP Level Progress Ring Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-5 backdrop-blur-xl shadow-xl min-w-[280px] space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Level {currentLevel} Target</p>
                <p className="text-sm font-extrabold text-white">{currentXP} XP Earned</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-blue-400">{Math.round(progressPercent)}%</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
              <span>{xpInCurrentLevel} XP</span>
              <span>{100 - xpInCurrentLevel} XP to Level {currentLevel + 1}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
