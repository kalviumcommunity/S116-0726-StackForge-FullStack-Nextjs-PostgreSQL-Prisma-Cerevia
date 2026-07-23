'use client';

import { MessageSquare, Pin, Star, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function AIChatHistory() {
  const chats = [
    { title: 'Next.js 15 Server Actions Refactoring', date: 'Today', isPinned: true },
    { title: 'Prisma Connection Pooling Architecture', date: 'Yesterday', isPinned: false },
    { title: 'Redis Cache Invalidation Patterns', date: '3 days ago', isPinned: false },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
          <span>Chat History</span>
        </span>
      </div>

      <div className="space-y-2">
        {chats.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 cursor-pointer transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              {c.isPinned && <Pin className="h-3 w-3 text-amber-400 shrink-0" />}
              <span className="font-bold text-white line-clamp-1">{c.title}</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono shrink-0">{c.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
