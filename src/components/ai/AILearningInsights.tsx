'use client';

import { TrendingUp } from 'lucide-react';

export function AILearningInsights() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
            <span>AI Analytical Intelligence</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Learning Metrics & Analytics
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Quiz Accuracy</p>
          <p className="text-2xl font-black text-emerald-600">92%</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Study Time</p>
          <p className="text-2xl font-black text-blue-700">14.5 hrs</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Strong Subject</p>
          <p className="text-base font-extrabold text-blue-700">Next.js 15</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Target Area</p>
          <p className="text-base font-extrabold text-indigo-700">Prisma ORM</p>
        </div>
      </div>
    </div>
  );
}
