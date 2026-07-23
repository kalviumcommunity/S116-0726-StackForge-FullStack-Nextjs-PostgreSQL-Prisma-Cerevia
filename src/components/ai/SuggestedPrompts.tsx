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
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      id: '2',
      title: 'Debug Async Event Loop Code',
      category: 'Coding',
      prompt: 'Analyze this Node.js async code block for memory leaks, unhandled promise rejections, and event loop blocking.',
      icon: Code2,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: '3',
      title: 'Generate Concept Quiz on Prisma ORM',
      category: 'Quiz',
      prompt: 'Generate a 5-question multiple choice quiz testing Prisma relational schema definitions, nested transactions, and connection pooling.',
      icon: HelpCircle,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: '4',
      title: 'Create 7-Day Distributed Systems Plan',
      category: 'Planner',
      prompt: 'Design a structured 7-day study roadmap for mastering microservice communication, Redis caching, gRPC, and PostgreSQL scaling.',
      icon: Calendar,
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      id: '5',
      title: 'Prepare Full-Stack Tech Interview Questions',
      category: 'Interview',
      prompt: 'Simulate a Senior Staff Engineer technical interview focusing on system design, database indexing, and state management.',
      icon: Briefcase,
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 fill-blue-400" />
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
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 shadow-lg cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn('text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border', card.badgeColor)}>
                    {card.category}
                  </span>
                  <Icon className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {card.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 pt-2 border-t border-zinc-800/80">
                <span>Click to launch query</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
