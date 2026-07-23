'use client';

import Image from 'next/image';
import { Flame, Trophy, Sparkles, User, ExternalLink, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LeaderboardEntryItem {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
  streak?: number;
  country?: string;
  batch?: string;
}

interface GlobalLeaderboardTableProps {
  entries: LeaderboardEntryItem[];
  currentUserId?: string;
  searchQuery: string;
  onSelectStudent?: (student: LeaderboardEntryItem) => void;
}

export function GlobalLeaderboardTable({
  entries,
  currentUserId,
  searchQuery,
  onSelectStudent,
}: GlobalLeaderboardTableProps) {
  const filteredEntries = entries.filter((e) => {
    if (!searchQuery) return true;
    const name = (e.fullName || '').toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
      
      {/* Table Header Row */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider select-none">
        <div className="col-span-2 sm:col-span-1">Rank</div>
        <div className="col-span-6 sm:col-span-6">Engineer</div>
        <div className="col-span-4 sm:col-span-3 text-right">Weekly XP</div>
        <div className="hidden sm:block sm:col-span-2 text-right">Streak</div>
      </div>

      {/* Entries List */}
      <div className="divide-y divide-zinc-800/80">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-zinc-500">
            No matching students found on the leaderboard.
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const isSelf = entry.userId === currentUserId;
            const level = Math.floor((entry.weeklyXP || 0) / 100) + 1;

            return (
              <div
                key={entry.userId}
                onClick={() => onSelectStudent && onSelectStudent(entry)}
                className={cn(
                  'grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 cursor-pointer select-none',
                  isSelf
                    ? 'bg-amber-500/10 border-y border-amber-500/30 ring-1 ring-amber-500/20'
                    : 'hover:bg-zinc-900/60'
                )}
              >
                {/* Rank # */}
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1 font-mono font-black text-sm">
                  <span
                    className={cn(
                      entry.rank === 1
                        ? 'text-amber-400 text-base'
                        : entry.rank === 2
                        ? 'text-zinc-300'
                        : entry.rank === 3
                        ? 'text-amber-600'
                        : 'text-zinc-500'
                    )}
                  >
                    #{entry.rank}
                  </span>
                </div>

                {/* Avatar & Name */}
                <div className="col-span-6 sm:col-span-6 flex items-center gap-3 min-w-0">
                  <div className="relative h-10 w-10 rounded-full border border-zinc-700 bg-zinc-900 overflow-hidden shrink-0">
                    {entry.avatar ? (
                      <Image
                        src={entry.avatar}
                        alt={entry.fullName || 'Student'}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-zinc-500 m-auto" />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-2">
                      {entry.fullName || 'Anonymous Engineer'}
                      {isSelf && (
                        <span className="bg-amber-500 text-zinc-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-blue-400" />
                      Level {level} Scholar • {entry.batch || 'Batch 2026'}
                    </span>
                  </div>
                </div>

                {/* Weekly XP */}
                <div className="col-span-4 sm:col-span-3 text-right">
                  <span className="text-xs sm:text-sm font-black text-amber-400 font-mono">
                    {entry.weeklyXP} XP
                  </span>
                </div>

                {/* Daily Streak */}
                <div className="hidden sm:flex sm:col-span-2 justify-end items-center gap-1 text-xs font-bold text-amber-400">
                  <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{entry.streak || 3}d</span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
