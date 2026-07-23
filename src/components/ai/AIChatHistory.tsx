'use client';

import { MessageSquare, Pin } from 'lucide-react';

export function AIChatHistory() {
  const chats = [
    { title: 'Next.js 15 Server Actions Refactoring', date: 'Today', isPinned: true },
    { title: 'Prisma Connection Pooling Architecture', date: 'Yesterday', isPinned: false },
    { title: 'Redis Cache Invalidation Patterns', date: '3 days ago', isPinned: false },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
          <span>Chat History</span>
        </span>
      </div>

      <div className="space-y-2">
        {chats.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/80 cursor-pointer transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              {c.isPinned && <Pin className="h-3 w-3 text-amber-600 shrink-0" />}
              <span className="font-bold text-slate-900 line-clamp-1">{c.title}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0">{c.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
