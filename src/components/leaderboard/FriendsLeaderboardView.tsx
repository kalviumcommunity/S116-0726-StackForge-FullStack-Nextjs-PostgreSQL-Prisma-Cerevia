'use client';

import Image from 'next/image';
import { Users, Flame, Trophy, Award, ArrowUpRight, UserPlus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FriendEntry {
  id: string;
  name: string;
  avatar: string;
  weeklyXP: number;
  rank: number;
  streak: number;
  recentAchievement: string;
  isOnline: boolean;
}

export function FriendsLeaderboardView() {
  const friends: FriendEntry[] = [
    {
      id: 'f1',
      name: 'Sarah Chen',
      avatar: '/images/community/avatars/friend1.webp',
      weeklyXP: 450,
      rank: 1,
      streak: 12,
      recentAchievement: 'Next.js Architect',
      isOnline: true,
    },
    {
      id: 'f2',
      name: 'Alex Rivera',
      avatar: '/images/community/avatars/friend2.webp',
      weeklyXP: 380,
      rank: 2,
      streak: 8,
      recentAchievement: 'Async Master',
      isOnline: false,
    },
    {
      id: 'f3',
      name: 'Test Student (You)',
      avatar: '/images/community/avatars/rank1.webp',
      weeklyXP: 320,
      rank: 3,
      streak: 5,
      recentAchievement: 'First Lesson',
      isOnline: true,
    },
    {
      id: 'f4',
      name: 'Elena Rostova',
      avatar: '/images/community/avatars/rank2.webp',
      weeklyXP: 240,
      rank: 4,
      streak: 3,
      recentAchievement: 'Quiz Champion',
      isOnline: true,
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            <Users className="h-3.5 w-3.5" />
            <span>Peer Network</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Friends Leaderboard Standings
          </h3>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-md">
          <UserPlus className="h-3.5 w-3.5" />
          <span>Add Friends</span>
        </button>
      </div>

      {/* Friends List Grid */}
      <div className="space-y-3">
        {friends.map((f) => {
          const isSelf = f.name.includes('(You)');

          return (
            <div
              key={f.id}
              className={cn(
                'flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 select-none',
                isSelf
                  ? 'bg-amber-500/10 border-amber-500/30 text-white'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-zinc-500 w-6">
                  #{f.rank}
                </span>

                <div className="relative h-11 w-11 rounded-full border border-zinc-700 bg-zinc-900 overflow-hidden shrink-0">
                  <Image
                    src={f.avatar}
                    alt={f.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {f.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    {f.name}
                    {isSelf && (
                      <span className="bg-amber-500 text-zinc-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                    <Award className="h-3 w-3 text-amber-400" />
                    Latest: {f.recentAchievement}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Flame className="h-3.5 w-3.5 fill-amber-400" />
                  <span>{f.streak}d</span>
                </div>

                <span className="text-xs sm:text-sm font-black text-white font-mono bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-xl">
                  {f.weeklyXP} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
