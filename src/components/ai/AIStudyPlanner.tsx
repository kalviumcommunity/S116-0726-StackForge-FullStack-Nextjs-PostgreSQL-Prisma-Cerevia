'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            <span>Personalized Learning Roadmap</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            AI Study Planner & Milestones
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs font-semibold">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={cn(
                'px-3 py-1 rounded-lg transition-all text-xs cursor-pointer',
                timeframe === t ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {t} Plan
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {roadmapMilestones.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                {m.day}
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{m.title}</h4>
                <p className="text-[10px] font-mono text-slate-500">Target Duration: 45 mins</p>
              </div>
            </div>

            <span
              className={cn(
                'text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border',
                m.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : m.status === 'In Progress'
                  ? 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
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
