'use client';

import { Activity, Calendar, Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LearningHeatmap() {
  // Generate 16 weeks of 7 days (112 days grid for crisp presentation)
  const days = Array.from({ length: 112 }, (_, i) => {
    // Generate deterministic intensity levels (0: none, 1: low, 2: med, 3: high, 4: max)
    const level = (i * 7 + 3) % 5;
    return {
      id: i,
      level: i > 105 ? (i % 2 === 0 ? 3 : 2) : level,
    };
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-zinc-900 border-zinc-800/80';
      case 1:
        return 'bg-emerald-950 border-emerald-800/40';
      case 2:
        return 'bg-emerald-800 border-emerald-600/50';
      case 3:
        return 'bg-emerald-600 border-emerald-400/60';
      case 4:
        return 'bg-emerald-400 border-emerald-200 shadow-sm shadow-emerald-400/30';
      default:
        return 'bg-zinc-900 border-zinc-800';
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <Activity className="h-3.5 w-3.5" />
            <span>Consistency Heatmap</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Learning Activity Graph
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-blue-400" /> 84 Active Days
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> 100% Monthly Consistency
          </span>
        </div>
      </div>

      {/* Grid Heatmap Container */}
      <div className="space-y-3">
        <div className="flex justify-between text-[10px] font-mono text-zinc-500 px-1">
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>

        <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto scrollbar-none pb-2">
          {days.map((d) => (
            <div
              key={d.id}
              title={`Day ${d.id + 1}: Activity Level ${d.level}`}
              className={cn(
                'h-3.5 w-3.5 rounded-sm border transition-all duration-200 hover:scale-125 cursor-pointer',
                getHeatmapColor(d.level)
              )}
            />
          ))}
        </div>

        {/* Legend Row */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2">
          <span>Continuous Daily Streak Active</span>

          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="h-3 w-3 rounded-sm bg-zinc-900 border border-zinc-800" />
            <div className="h-3 w-3 rounded-sm bg-emerald-950 border border-emerald-800/40" />
            <div className="h-3 w-3 rounded-sm bg-emerald-800 border border-emerald-600/50" />
            <div className="h-3 w-3 rounded-sm bg-emerald-600 border border-emerald-400/60" />
            <div className="h-3 w-3 rounded-sm bg-emerald-400 border border-emerald-200" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
