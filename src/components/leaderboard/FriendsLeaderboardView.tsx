'use client';

import Image from 'next/image';
import { Users, Flame, Award, UserPlus } from 'lucide-react';
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <Users className="h-3.5 w-3.5 text-blue-600" />
            <span>Peer Network</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Friends Leaderboard Standings
          </h3>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs">
          <UserPlus className="h-3.5 w-3.5" />
          <span>Add Friends</span>
        </button>
      </div>

      <div className="space-y-3">
        {friends.map((f) => {
          const isSelf = f.name.includes('(You)');

          return (
            <div
              key={f.id}
              className={cn(
                'flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 select-none',
                isSelf
                  ? 'bg-blue-50/80 border-blue-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-slate-400 w-6">
                  #{f.rank}
                </span>

                <div className="relative h-11 w-11 rounded-full border border-slate-200 bg-slate-100 overflow-hidden shrink-0">
                  <Image
                    src={f.avatar}
                    alt={f.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {f.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    {f.name}
                    {isSelf && (
                      <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Award className="h-3 w-3 text-amber-500" />
                    Latest: {f.recentAchievement}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
                  <Flame className="h-3.5 w-3.5 fill-blue-600" />
                  <span>{f.streak}d</span>
                </div>

                <span className="text-xs sm:text-sm font-black text-blue-700 font-mono bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl">
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
