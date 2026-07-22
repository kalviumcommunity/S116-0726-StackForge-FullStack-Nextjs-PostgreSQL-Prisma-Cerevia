'use client';

import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  Code2,
  Bot,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PathMilestone {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface CareerPath {
  id: string;
  title: string;
  role: string;
  description: string;
  icon: typeof Code2;
  color: string;
  bgColor: string;
  borderColor: string;
  progress: number;
  totalDuration: string;
  milestones: PathMilestone[];
}

export function LearningPathsRoadmap() {
  const careerPaths: CareerPath[] = [
    {
      id: 'fullstack',
      title: 'Full Stack Web Architect',
      role: 'Production Web Engineer',
      description:
        'Master React 19, Next.js 15 App Router, Prisma ORM, PostgreSQL, and Server Actions.',
      icon: Layers,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      progress: 65,
      totalDuration: '40 Hours',
      milestones: [
        {
          id: 'm1',
          title: 'HTML5 & Semantic Document Architecture',
          duration: '4h',
          completed: true,
        },
        {
          id: 'm2',
          title: 'CSS Grid, Flexbox & Theme Tokens',
          duration: '6h',
          completed: true,
        },
        {
          id: 'm3',
          title: 'JavaScript Closures, Async & Event Loop',
          duration: '8h',
          completed: true,
        },
        {
          id: 'm4',
          title: 'Next.js App Router & Server Components',
          duration: '12h',
          completed: false,
        },
        {
          id: 'm5',
          title: 'Prisma ORM & PostgreSQL Schema Migration',
          duration: '10h',
          completed: false,
        },
      ],
    },
    {
      id: 'ai-copilot',
      title: 'AI Engineering & Copilot Systems',
      role: 'AI / LLM Application Developer',
      description:
        'Build production AI agents, RAG vector pipelines, prompt optimization, and OpenAI/Cerevia tools.',
      icon: Bot,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      progress: 30,
      totalDuration: '32 Hours',
      milestones: [
        {
          id: 'a1',
          title: 'Generative AI & Transformer Fundamentals',
          duration: '5h',
          completed: true,
        },
        {
          id: 'a2',
          title: 'Prompt Engineering & System Personas',
          duration: '6h',
          completed: true,
        },
        {
          id: 'a3',
          title: 'Vector Embeddings & Semantic Search',
          duration: '9h',
          completed: false,
        },
        {
          id: 'a4',
          title: 'Multi-Agent Orchestration & Function Calling',
          duration: '12h',
          completed: false,
        },
      ],
    },
    {
      id: 'systems',
      title: 'Distributed Systems & Database Scaling',
      role: 'Backend / Systems Engineer',
      description:
        'Scale relational databases, Redis caching, microservices, gRPC, and high-availability architecture.',
      icon: ShieldCheck,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      progress: 80,
      totalDuration: '28 Hours',
      milestones: [
        {
          id: 's1',
          title: 'Relational Database Normalization',
          duration: '6h',
          completed: true,
        },
        {
          id: 's2',
          title: 'Redis Caching Strategy & Key Eviction',
          duration: '6h',
          completed: true,
        },
        {
          id: 's3',
          title: 'PostgreSQL Indexing B-Trees',
          duration: '8h',
          completed: true,
        },
        {
          id: 's4',
          title: 'Rate Limiting & Token Bucket Algorithms',
          duration: '8h',
          completed: false,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400">
          <Compass className="h-3.5 w-3.5" />
          <span>Structured Career Roadmaps</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Guided Learning Paths
        </h2>
        <p className="max-w-xl text-xs text-zinc-400">
          Follow battle-tested learning sequences designed by senior staff
          engineers from Apple, Linear, and Vercel.
        </p>
      </div>

      {/* Grid of Learning Path Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {careerPaths.map((path) => {
          const Icon = path.icon;

          return (
            <div
              key={path.id}
              className="group flex flex-col justify-between space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl transition-all duration-300 hover:border-zinc-700"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-2xl border',
                      path.bgColor,
                      path.borderColor,
                      path.color,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {path.totalDuration}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-wider',
                      path.color,
                    )}
                  >
                    {path.role}
                  </span>
                  <h3 className="text-xl font-extrabold text-white transition-colors group-hover:text-blue-400">
                    {path.title}
                  </h3>
                  <p className="text-xs font-normal leading-relaxed text-zinc-400">
                    {path.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-400">Path Progress</span>
                    <span className="font-bold text-white">
                      {path.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                </div>

                {/* Timeline Milestones */}
                <div className="space-y-2.5 border-t border-zinc-800/80 pt-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Milestone Modules
                  </p>
                  <div className="space-y-2">
                    {path.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {m.completed ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 text-zinc-600" />
                          )}
                          <span
                            className={cn(
                              'truncate font-medium',
                              m.completed ? 'text-zinc-300' : 'text-zinc-500',
                            )}
                          >
                            {m.title}
                          </span>
                        </div>
                        <span className="ml-2 shrink-0 font-mono text-[10px] text-zinc-500">
                          {m.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="border-t border-zinc-800/80 pt-4">
                <Link
                  href="/lessons"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-md transition-all hover:bg-zinc-100 group-hover:translate-x-0.5"
                >
                  <span>Continue Learning Path</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
