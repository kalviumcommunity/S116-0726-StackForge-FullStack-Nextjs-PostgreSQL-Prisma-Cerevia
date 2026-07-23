'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, BookOpen, Award, Heart, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityFeedItem {
  id: string;
  userName: string;
  avatar: string;
  action: string;
  detail: string;
  xpEarned?: number;
  timeAgo: string;
  likes: number;
}

export function CommunityActivityFeed() {
  const [feedItems, setFeedItems] = useState<ActivityFeedItem[]>([
    {
      id: 'a1',
      userName: 'Sarah Chen',
      avatar: '/images/community/avatars/friend1.webp',
      action: 'Completed Module',
      detail: 'Next.js 15 Server Actions & Optimistic UI',
      xpEarned: 50,
      timeAgo: '12m ago',
      likes: 8,
    },
    {
      id: 'a2',
      userName: 'Alex Rivera',
      avatar: '/images/community/avatars/friend2.webp',
      action: 'Ranked Up',
      detail: 'Reached Level 4 Creator Scholar Status',
      xpEarned: 100,
      timeAgo: '45m ago',
      likes: 14,
    },
    {
      id: 'a3',
      userName: 'Elena Rostova',
      avatar: '/images/community/avatars/rank2.webp',
      action: 'Passed Concept Quiz',
      detail: 'Relational Database Schema & Prisma ORM',
      xpEarned: 30,
      timeAgo: '2h ago',
      likes: 5,
    },
    {
      id: 'a4',
      userName: 'David Miller',
      avatar: '/images/community/avatars/rank3.webp',
      action: 'Unlocked Badge',
      detail: '7 Day Streak Hero Insignia',
      xpEarned: 200,
      timeAgo: '3h ago',
      likes: 19,
    },
  ]);

  const handleLike = (id: string) => {
    setFeedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
            <span>Community Timeline</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Live Social Learning Activity
          </h3>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          Real-time Updates
        </span>
      </div>

      {/* Feed Timeline */}
      <div className="space-y-4">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-10 w-10 rounded-full border border-zinc-700 bg-zinc-900 overflow-hidden shrink-0 mt-0.5">
                <Image
                  src={item.avatar}
                  alt={item.userName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.userName}</h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                    {item.action}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                  {item.detail}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {item.timeAgo}
                  </span>

                  {item.xpEarned && (
                    <span className="text-amber-400 font-bold">
                      +{item.xpEarned} XP
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Like Button */}
            <button
              onClick={() => handleLike(item.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 transition-all shrink-0"
            >
              <Heart className="h-3.5 w-3.5 fill-rose-500/20 text-rose-400" />
              <span>{item.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
