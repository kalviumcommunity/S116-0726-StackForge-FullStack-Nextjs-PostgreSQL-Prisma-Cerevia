'use client';

import Image from 'next/image';
import { Bot, Sparkles, Zap, Code2, HelpCircle } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

interface AIMentorHeroProps {
  onQuickAction?: (actionText: string) => void;
}

export function AIMentorHero({ onQuickAction }: AIMentorHeroProps) {
  const { user } = useAuth();
  const userName = user?.fullName?.split(' ')[0] || 'Student';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Identity & Greeting */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
              <Bot className="h-3.5 w-3.5 text-blue-600" />
              <span>Cerevia AI Copilot v2.4</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Personal Tutor Online</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            Hello, <span className="text-blue-600">{userName}</span> 👋
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
            What would you like to explore today? Ask questions, debug code, generate quizzes, or craft a custom study plan.
          </p>
        </div>

        {/* AI Mentor Avatar Card */}
        <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-2 shadow-xs flex items-center justify-center shrink-0 group">
          <Image
            src="/images/ai/mentor.webp"
            alt="AI Mentor Avatar"
            fill
            unoptimized
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -bottom-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
            AI Mentor
          </div>
        </div>

      </div>

      {/* Quick Action Prompt Shortcuts */}
      <div className="relative z-10 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">
          Quick Prompts:
        </span>

        {[
          { label: 'Explain Next.js 15 Server Actions', icon: Code2 },
          { label: 'Debug Async Event Loop Code', icon: Zap },
          { label: 'Generate Concept Quiz on Prisma', icon: HelpCircle },
          { label: 'Create 7-Day Distributed Systems Plan', icon: Sparkles },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => onQuickAction && onQuickAction(item.label)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-all select-none cursor-pointer"
          >
            <item.icon className="h-3.5 w-3.5 text-blue-600" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
