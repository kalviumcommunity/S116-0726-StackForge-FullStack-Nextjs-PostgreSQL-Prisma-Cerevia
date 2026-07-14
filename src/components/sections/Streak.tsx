import * as React from 'react';
import { Flame } from 'lucide-react';

interface StreakProps {
  count?: number;
}

export function Streak({ count = 12 }: StreakProps) {
  return (
    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 animate-pulse">
          <Flame className="h-6 w-6 fill-current" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Current Streak</h4>
          <p className="text-xs text-muted-foreground">Keep studying to increase your XP multipliers.</p>
        </div>
      </div>
      <span className="text-2xl font-extrabold text-orange-500">{count} Days</span>
    </div>
  );
}
