'use client';

import { Trophy, Target, Zap, ArrowRight } from 'lucide-react';

export function CommunityChallengesCard() {
  const challenges = [
    { title: 'Global Weekly XP Race', target: '50,000 Total XP', progress: 68, reward: '+500 XP Bonus' },
    { title: '1,000 XP Coding Sprint', target: '1,000 XP per Scholar', progress: 82, reward: 'Legendary Badge' },
    { title: 'Quiz Marathon', target: '500 Quizzes Passed', progress: 45, reward: '+250 XP Bonus' },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Trophy className="h-3.5 w-3.5" />
            <span>Co-Op Sprints</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Community Challenges
          </h3>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          Ends in 2 Days
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <div key={i} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-3">
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{c.title}</h4>
              <p className="text-[10px] text-zinc-400 font-mono">{c.target}</p>
            </div>

            <div className="space-y-1">
              <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-amber-400 rounded-full"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>{c.progress}% Complete</span>
                <span className="text-amber-400 font-bold">{c.reward}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
