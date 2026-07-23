'use client';

import Image from 'next/image';
import { Trophy, Crown, Flame, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PodiumStudent {
  userId: string;
  fullName: string;
  avatar: string;
  weeklyXP: number;
  rank: number;
  streak: number;
  level: number;
}

export function PodiumSection({ topThree }: { topThree: PodiumStudent[] }) {
  if (!topThree || topThree.length < 3) return null;

  const first = topThree.find((s) => s.rank === 1) || topThree[0];
  const second = topThree.find((s) => s.rank === 2) || topThree[1];
  const third = topThree.find((s) => s.rank === 3) || topThree[2];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
      {/* Background Spotlight Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-950/80 to-zinc-950" />

      {/* Header */}
      <div className="text-center space-y-1 relative z-10">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
          <span>Hall of Fame</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Top 3 Global Scholars
        </h2>
      </div>

      {/* Podium Layout */}
      <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-3xl mx-auto pt-6">
        
        {/* 2nd Place (Left) */}
        <div className="flex flex-col items-center space-y-3 group">
          <div className="relative flex flex-col items-center">
            <Crown className="h-6 w-6 text-zinc-300 fill-zinc-300 mb-1 animate-bounce" />
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-zinc-400 bg-zinc-900 overflow-hidden shadow-xl group-hover:scale-105 transition-transform">
              <Image
                src={second.avatar || '/images/community/avatars/rank2.webp'}
                alt={second.fullName}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-2 bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
              #2
            </span>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{second.fullName}</h4>
            <p className="text-[11px] font-mono text-zinc-400 font-bold">{second.weeklyXP} XP</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400">
              <Flame className="h-3 w-3 fill-amber-400" /> {second.streak}d
            </span>
          </div>

          <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-t from-zinc-900 to-zinc-800 border-x border-t border-zinc-700/80 flex items-center justify-center text-zinc-400 font-black text-2xl shadow-lg">
            2
          </div>
        </div>

        {/* 1st Place (Middle - Gold Champion) */}
        <div className="flex flex-col items-center space-y-3 group -mt-6">
          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-1 text-amber-400 animate-pulse mb-1">
              <Crown className="h-8 w-8 fill-amber-400" />
            </div>
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-amber-400 bg-zinc-900 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform ring-4 ring-amber-500/20">
              <Image
                src={first.avatar || '/images/community/avatars/rank1.webp'}
                alt={first.fullName}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-2.5 bg-amber-500 text-zinc-950 border border-amber-400 text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg">
              #1
            </span>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-sm sm:text-base font-black text-white line-clamp-1">{first.fullName}</h4>
            <p className="text-xs font-mono text-amber-400 font-black">{first.weeklyXP} XP</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-bold">
              <Flame className="h-3 w-3 fill-amber-400" /> {first.streak}d Streak
            </span>
          </div>

          <div className="w-full h-32 sm:h-36 rounded-t-2xl bg-gradient-to-t from-amber-600/30 via-zinc-900 to-zinc-900 border-x border-t border-amber-500/50 flex items-center justify-center text-amber-400 font-black text-3xl shadow-2xl">
            1
          </div>
        </div>

        {/* 3rd Place (Right) */}
        <div className="flex flex-col items-center space-y-3 group">
          <div className="relative flex flex-col items-center">
            <Crown className="h-6 w-6 text-amber-600 fill-amber-600 mb-1" />
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-amber-700 bg-zinc-900 overflow-hidden shadow-xl group-hover:scale-105 transition-transform">
              <Image
                src={third.avatar || '/images/community/avatars/rank3.webp'}
                alt={third.fullName}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-2 bg-zinc-800 text-amber-600 border border-zinc-700 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
              #3
            </span>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{third.fullName}</h4>
            <p className="text-[11px] font-mono text-zinc-400 font-bold">{third.weeklyXP} XP</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400">
              <Flame className="h-3 w-3 fill-amber-400" /> {third.streak}d
            </span>
          </div>

          <div className="w-full h-20 sm:h-24 rounded-t-2xl bg-gradient-to-t from-zinc-900 to-zinc-800 border-x border-t border-zinc-700/80 flex items-center justify-center text-zinc-500 font-black text-2xl shadow-lg">
            3
          </div>
        </div>

      </div>
    </div>
  );
}
