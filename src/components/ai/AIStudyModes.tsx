'use client';

import {
  BookOpen,
  Code2,
  HelpCircle,
  Calendar,
  Mic,
  FileText,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type AIStudyModeId =
  | 'learn'
  | 'coding'
  | 'quiz'
  | 'planner'
  | 'voice'
  | 'files'
  | 'interview'
  | 'insights';

interface AIStudyModesProps {
  activeMode: AIStudyModeId;
  onModeChange: (mode: AIStudyModeId) => void;
}

export function AIStudyModes({ activeMode, onModeChange }: AIStudyModesProps) {
  const modes: { id: AIStudyModeId; label: string; icon: typeof BookOpen; badge?: string }[] = [
    { id: 'learn', label: 'Learn & Explain', icon: BookOpen },
    { id: 'coding', label: 'Coding Mentor', icon: Code2 },
    { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle },
    { id: 'planner', label: 'Study Planner', icon: Calendar },
    { id: 'voice', label: 'Voice Assistant', icon: Mic, badge: 'Live' },
    { id: 'files', label: 'File Analysis', icon: FileText },
    { id: 'interview', label: 'Interview Prep', icon: Briefcase },
    { id: 'insights', label: 'AI Insights', icon: TrendingUp },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 select-none cursor-pointer',
                isActive
                  ? 'bg-white text-zinc-950 border-white shadow-md'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:text-white hover:bg-zinc-900'
              )}
            >
              <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-zinc-950' : 'text-blue-400')} />
              <span>{mode.label}</span>

              {mode.badge && (
                <span
                  className={cn(
                    'text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md',
                    isActive ? 'bg-zinc-950 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                  )}
                >
                  {mode.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
