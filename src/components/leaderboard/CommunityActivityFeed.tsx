'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Clock } from 'lucide-react';

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
  ]);

  const handleLike = (id: string) => {
    setFeedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
            <span>Community Timeline</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Live Social Learning Activity
          </h3>
        </div>

        <span className="text-xs font-mono text-slate-500">
          Real-time Updates
        </span>
      </div>

      <div className="space-y-3">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-10 w-10 rounded-full border border-slate-200 bg-slate-100 overflow-hidden shrink-0 mt-0.5">
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
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.userName}</h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                    {item.action}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.detail}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {item.timeAgo}
                  </span>

                  {item.xpEarned && (
                    <span className="text-blue-700 font-bold">
                      +{item.xpEarned} XP
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleLike(item.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all shrink-0 shadow-xs"
            >
              <Heart className="h-3.5 w-3.5 fill-rose-500/20 text-rose-500" />
              <span>{item.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
