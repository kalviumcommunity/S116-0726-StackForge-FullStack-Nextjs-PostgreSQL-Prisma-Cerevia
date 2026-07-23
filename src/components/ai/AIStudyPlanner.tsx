'use client';

import { useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIStudyPlanner() {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const roadmapMilestones = [
    { day: 'Day 1', title: 'Next.js 15 App Router & Server Components', status: 'Completed' },
    { day: 'Day 2', title: 'Prisma Relational Schemas & Migrations', status: 'In Progress' },
    { day: 'Day 3', title: 'Redis Cache Invalidation & Event Loops', status: 'Scheduled' },
    { day: 'Day 4', title: 'System Architecture & Microservices', status: 'Scheduled' },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            <Calendar className="h-3.5 w-3.5" />
            <span>Personalized Learning Roadmap</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            AI Study Planner & Milestones
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-semibold">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={cn(
                'px-3 py-1 rounded-lg transition-all text-xs',
                timeframe === t ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              )}
            >
              {t} Plan
            </button>
          ))}
        </div>
      </div>

      {/* Milestone Roadmap */}
      <div className="space-y-3">
        {roadmapMilestones.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                {m.day}
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">{m.title}</h4>
                <p className="text-[10px] font-mono text-zinc-500">Target Duration: 45 mins</p>
              </div>
            </div>

            <span
              className={cn(
                'text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border',
                m.status === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : m.status === 'In Progress'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                  : 'bg-zinc-800 text-zinc-500 border-zinc-700'
              )}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
