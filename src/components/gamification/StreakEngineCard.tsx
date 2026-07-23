'use client';

import Image from 'next/image';
import { Flame, ShieldCheck, Calendar, Trophy, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakEngineCardProps {
  currentStreak: number;
}

export function StreakEngineCard({ currentStreak }: StreakEngineCardProps) {
  const longestStreak = Math.max(currentStreak, 14);
  const weeklyActiveDays = [true, true, true, true, currentStreak > 0, false, false];

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return 'Start your daily learning streak today by completing a lesson!';
    if (streak < 3) return 'Great momentum! Complete tomorrow to unlock your 1.1x XP booster.';
    if (streak < 7) return 'On Fire! 1.1x XP Multiplier active across all syllabus tasks.';
    if (streak < 14) return 'Supercharged! 1.25x XP Multiplier active across all syllabus tasks.';
    return 'Legendary Master Streak! 1.5x Maximum XP Multiplier active.';
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-amber-500/10 blur-[80px]" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Flame className="h-4 w-4 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              Daily Motivation Engine
            </span>
            <p className="text-xs font-bold text-white">Learning Streak Tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Streak Freeze Protected</span>
        </div>
      </div>

      {/* Main Grid: Flame Visual & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left Column: Big Flame Badge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 text-center space-y-3 relative group">
          <div className="relative h-24 w-24 rounded-full flex items-center justify-center">
            <Image
              src="/images/gamification/streak/flame-active.webp"
              alt="Active Flame"
              fill
              unoptimized
              className="object-contain animate-bounce"
            />
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currentStreak} <span className="text-xl font-bold text-amber-400">Days</span>
            </h3>
            <p className="text-xs text-amber-300 font-semibold mt-0.5">Active Daily Streak</p>
          </div>
        </div>

        {/* Middle & Right: Message & Stats */}
        <div className="md:col-span-2 space-y-5">
          
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Zap className="h-4 w-4 fill-amber-400" />
              <span>Streak Booster Status</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {getStreakMessage(currentStreak)}
            </p>
          </div>

          {/* 7-Day Activity Week Tracker */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-zinc-400">
              <span>This Week&apos;s Target</span>
              <span>{weeklyActiveDays.filter(Boolean).length} / 7 Days Active</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const isActive = weeklyActiveDays[idx];
                return (
                  <div
                    key={idx}
                    className={cn(
                      'flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all',
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 font-bold'
                        : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-600'
                    )}
                  >
                    <span className="text-[10px] font-mono mb-1">{day}</span>
                    <Flame className={cn('h-3.5 w-3.5', isActive ? 'fill-amber-400 text-amber-400' : 'text-zinc-700')} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Records Row */}
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
            <span className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-400" /> Longest Streak Record: <strong className="text-white">{longestStreak} Days</strong>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> 1 Recovery Shield Remaining
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
