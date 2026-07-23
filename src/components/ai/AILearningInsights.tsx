'use client';

import { TrendingUp, Target, Award, Clock, Sparkles } from 'lucide-react';

export function AILearningInsights() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>AI Analytical Intelligence</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Learning Metrics & Analytics
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase">Quiz Accuracy</p>
          <p className="text-2xl font-black text-emerald-400">92%</p>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase">Study Time</p>
          <p className="text-2xl font-black text-blue-400">14.5 hrs</p>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase">Strong Subject</p>
          <p className="text-base font-extrabold text-amber-400">Next.js 15</p>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase">Target Area</p>
          <p className="text-base font-extrabold text-indigo-400">Prisma ORM</p>
        </div>
      </div>
    </div>
  );
}
