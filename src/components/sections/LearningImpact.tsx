'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Users,
  GraduationCap,
  CheckCircle,
  Award,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const STATS: StatItem[] = [
  {
    id: 'students',
    label: 'Active Students',
    value: 20000,
    suffix: '+',
    icon: Users,
    description: 'Engineers & students learning daily on Cerevia',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'courses',
    label: 'Interactive Courses',
    value: 150,
    suffix: '+',
    icon: GraduationCap,
    description: 'Hands-on syllabi spanning AI, Full Stack & Cloud',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'lessons',
    label: 'Lessons Completed',
    value: 1000000,
    suffix: '+',
    icon: CheckCircle,
    description: 'Code submissions evaluated with instant feedback',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'completion',
    label: 'Completion Rate',
    value: 98,
    suffix: '%',
    icon: Award,
    description: 'Industry leading retention & goal achievement',
    color: 'from-purple-600 to-pink-600',
  },
];

export function LearningImpact() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    students: 0,
    courses: 0,
    lessons: 0,
    completion: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
              students: Math.min(20000, Math.floor(20000 * progress)),
              courses: Math.min(150, Math.floor(150 * progress)),
              lessons: Math.min(1000000, Math.floor(1000000 * progress)),
              completion: Math.min(98, Math.floor(98 * progress)),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-24 text-white"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 opacity-50 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-1.5 text-xs font-semibold text-amber-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Proven Student Outcomes</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Learning Impact &amp; Global Reach
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">
            Empowering students across 120+ countries to master technical
            engineering and land top software roles.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            const valueDisplay = formatNumber(counts[stat.id] || 0);

            return (
              <div
                key={stat.id}
                className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90"
              >
                {/* Icon Capsule */}
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-white transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>

                {/* Animated Count */}
                <div className="mb-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  <span>{valueDisplay}</span>
                  <span className="font-bold text-amber-400">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="mb-2 text-base font-bold text-zinc-200">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-xs leading-relaxed text-zinc-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Activity Ribbon */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-xs text-zinc-400 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500" />
            <span className="font-semibold text-zinc-200">
              Real-time Platform Pulse:
            </span>
            <span>
              Over 1,420 students actively solving code challenges right now
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span>99.9% Uptime Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
