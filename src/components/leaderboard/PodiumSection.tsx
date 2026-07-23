'use client';

import Image from 'next/image';
import { Crown, Flame, Sparkles } from 'lucide-react';

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-1 relative z-10">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
          <Sparkles className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
          <span>Hall of Fame</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Top 3 Global Scholars
        </h2>
      </div>

      {/* Podium Layout */}
      <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-3xl mx-auto pt-6">
        
        {/* 2nd Place (Left) */}
        <div className="flex flex-col items-center space-y-3 group">
          <div className="relative flex flex-col items-center">
            <Crown className="h-6 w-6 text-slate-400 fill-slate-400 mb-1" />
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-slate-300 bg-slate-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src={second.avatar || '/images/community/avatars/rank2.webp'}
                alt={second.fullName}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-2 bg-slate-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
              #2
            </span>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{second.fullName}</h4>
            <p className="text-[11px] font-mono text-blue-700 font-bold">{second.weeklyXP} XP</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-blue-600">
              <Flame className="h-3 w-3 fill-blue-600" /> {second.streak}d
            </span>
          </div>

          <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-t from-slate-200 to-slate-100 border-x border-t border-slate-300 flex items-center justify-center text-slate-500 font-black text-2xl shadow-xs">
            2
          </div>
        </div>

        {/* 1st Place (Middle - Gold Champion) */}
        <div className="flex flex-col items-center space-y-3 group -mt-6">
          <div className="relative flex flex-col items-center">
            <Crown className="h-8 w-8 text-amber-500 fill-amber-500 mb-1" />
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-amber-400 bg-amber-50 overflow-hidden shadow-md group-hover:scale-105 transition-transform">
              <Image
                src={first.avatar || '/images/community/avatars/rank1.webp'}
                alt={first.fullName}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-2.5 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
              #1
            </span>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">{first.fullName}</h4>
            <p className="text-xs font-mono text-amber-700 font-black">{first.weeklyXP} XP</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-bold">
              <Flame className="h-3 w-3 fill-amber-600 text-amber-600" /> {first.streak}d Streak
            </span>
          </div>

          <div className="w-full h-32 sm:h-36 rounded-t-2xl bg-gradient-to-t from-amber-100 to-amber-50 border-x border-t border-amber-300 flex items-center justify-center text-amber-600 font-black text-3xl shadow-sm">
            1
          </div>
        </div>

        {/* 3rd Place (Right) */}
        <div className="flex flex-col items-center space-y-3 group">
          <div className="relative flex flex-col items-center">
            <Crown className="h-6 w-6 text-amber-700 fill-amber-700 mb-1" />
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-amber-700/40 bg-slate-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src={third.avatar || '/images/community/avatars/rank3.webp'}
                alt={third.fullName}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-2 bg-slate-800 text-amber-500 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
              #3
            </span>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{third.fullName}</h4>
            <p className="text-[11px] font-mono text-blue-700 font-bold">{third.weeklyXP} XP</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-blue-600">
              <Flame className="h-3 w-3 fill-blue-600" /> {third.streak}d
            </span>
          </div>

          <div className="w-full h-20 sm:h-24 rounded-t-2xl bg-gradient-to-t from-slate-200 to-slate-100 border-x border-t border-slate-300 flex items-center justify-center text-slate-500 font-black text-2xl shadow-xs">
            3
          </div>
        </div>

      </div>
    </div>
  );
}
