'use client';

import { Sparkles, Code2, HelpCircle, Calendar, BookOpen, Briefcase, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptCard {
  id: string;
  title: string;
  category: 'Concept' | 'Coding' | 'Quiz' | 'Planner' | 'Interview';
  prompt: string;
  icon: typeof Sparkles;
  badgeColor: string;
}

interface SuggestedPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  const promptCards: PromptCard[] = [
    {
      id: '1',
      title: 'Explain Next.js 15 Server Actions',
      category: 'Concept',
      prompt: 'Explain how Next.js 15 Server Actions handle mutation state, optimistic UI updates, and path revalidation with clear TypeScript examples.',
      icon: BookOpen,
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: '2',
      title: 'Debug Async Event Loop Code',
      category: 'Coding',
      prompt: 'Analyze this Node.js async code block for memory leaks, unhandled promise rejections, and event loop blocking.',
      icon: Code2,
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: '3',
      title: 'Generate Concept Quiz on Prisma ORM',
      category: 'Quiz',
      prompt: 'Generate a 5-question multiple choice quiz testing Prisma relational schema definitions, nested transactions, and connection pooling.',
      icon: HelpCircle,
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      id: '4',
      title: 'Create 7-Day Distributed Systems Plan',
      category: 'Planner',
      prompt: 'Design a structured 7-day study roadmap for mastering microservice communication, Redis caching, gRPC, and PostgreSQL scaling.',
      icon: Calendar,
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
    {
      id: '5',
      title: 'Prepare Full-Stack Tech Interview Questions',
      category: 'Interview',
      prompt: 'Simulate a Senior Staff Engineer technical interview focusing on system design, database indexing, and state management.',
      icon: Briefcase,
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>Recommended AI Prompts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {promptCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onSelectPrompt(card.prompt)}
              className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 shadow-xs cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn('text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border', card.badgeColor)}>
                    {card.category}
                  </span>
                  <Icon className="h-4 w-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {card.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                <span>Click to launch query</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
