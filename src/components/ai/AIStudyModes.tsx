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
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xs">
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
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-100/80 text-slate-600 border-slate-200/80 hover:text-slate-900 hover:bg-slate-200/60'
              )}
            >
              <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-white' : 'text-blue-600')} />
              <span>{mode.label}</span>

              {mode.badge && (
                <span
                  className={cn(
                    'text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md',
                    isActive ? 'bg-white text-blue-700' : 'bg-red-50 text-red-700 border border-red-200 animate-pulse'
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
