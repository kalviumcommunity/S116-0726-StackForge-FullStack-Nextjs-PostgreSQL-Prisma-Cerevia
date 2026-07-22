'use client';

import Image from 'next/image';
import {
  Bot,
  Flame,
  Code2,
  LineChart,
  Trophy,
  Award,
  Sparkles,
  Check,
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  illustration: string;
  badge: string;
  highlights: string[];
}

const FEATURES: Feature[] = [
  {
    id: 'ai-mentor',
    title: 'AI Mentor & Code Reviewer',
    subtitle: '24/7 Intelligent Pair Programmer',
    description:
      'Get instant feedback on your code syntax, memory optimization, and architectural decisions as you type.',
    icon: Bot,
    illustration: '/images/illustrations/ai-mentor-visual.webp',
    badge: 'AI Powered',
    highlights: [
      'Instant AST code inspection',
      'Automated bug detection',
      'Personalized hints',
    ],
  },
  {
    id: 'gamification',
    title: 'Gamified Learning Engine',
    subtitle: 'Daily Streaks & Level XP',
    description:
      'Turn study habits into an addictive RPG experience. Earn XP, maintain daily streaks, and unlock achievement badges.',
    icon: Flame,
    illustration: '/images/illustrations/gamified-xp-visual.webp',
    badge: 'High Engagement',
    highlights: [
      'Daily streak multiplier',
      'Skill milestone badges',
      'Rank level ups',
    ],
  },
  {
    id: 'hands-on',
    title: 'Hands-on Web Sandboxes',
    subtitle: 'Zero Setup In-Browser IDE',
    description:
      'Execute code instantly in isolated sandboxes supporting React, Node.js, Python, Java, and C++ with full terminal output.',
    icon: Code2,
    illustration: '/images/illustrations/hands-on-coding.webp',
    badge: 'Zero Setup',
    highlights: [
      'Real-time execution',
      'Multi-language runtime',
      'Unit test integration',
    ],
  },
  {
    id: 'progress',
    title: 'Deep Analytics & Progress',
    subtitle: 'Visual Skill Mastery Matrix',
    description:
      'Track your growth across algorithms, backend design, and frontend systems with granular performance charts.',
    icon: LineChart,
    illustration: '/images/illustrations/ai-mentor-visual.webp',
    badge: 'Data Driven',
    highlights: ['Weak spot detection', 'Completion velocity', 'Skill heatmap'],
  },
  {
    id: 'leaderboards',
    title: 'Global Peer Leaderboards',
    subtitle: 'Competitive Weekly Arena',
    description:
      'Compete against thousands of global engineering students in timed coding sprints and weekly leaderboard ranks.',
    icon: Trophy,
    illustration: '/images/illustrations/gamified-xp-visual.webp',
    badge: 'Social Learning',
    highlights: [
      'Global & regional ranks',
      'Peer code comparisons',
      'Weekly prize pools',
    ],
  },
  {
    id: 'certificates',
    title: 'Verified Certificates',
    subtitle: 'Industry-Recognized Credentials',
    description:
      'Earn cryptographic certificates upon course completion that can be embedded on your LinkedIn profile and resume.',
    icon: Award,
    illustration: '/images/illustrations/certificate-badge.webp',
    badge: 'Career Ready',
    highlights: [
      'LinkedIn integration',
      'Verifiable credential URL',
      'Recruiter ready',
    ],
  },
];

export function WhyCerevia() {
  return (
    <section id="why-cerevia" className="bg-[#FAFAFA] py-24 dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Why Engineers Choose Us</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
            Built for Modern Learning
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Everything you need to transform theoretical knowledge into
            real-world software engineering expertise.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative flex transform flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900/60"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-md transition-transform group-hover:scale-110 dark:bg-white dark:text-zinc-950">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mb-1 text-xl font-bold text-zinc-950 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {feature.title}
                  </h3>
                  <p className="mb-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {feature.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mb-6 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    {feature.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subdued Bottom WebP Illustration strip */}
                <div className="relative mt-6 h-14 w-full overflow-hidden rounded-xl opacity-70 transition-opacity group-hover:opacity-100">
                  <Image
                    src={feature.illustration}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-zinc-900/90" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
