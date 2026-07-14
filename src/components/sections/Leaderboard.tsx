import * as React from 'react';
import { Trophy } from 'lucide-react';

export function Leaderboard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <span>Weekly Top Standings</span>
      </h3>
      <p className="text-xs text-muted-foreground">Compete to see your name here.</p>
    </div>
  );
}
