import * as React from 'react';
import { Zap, Heart, Database, ShieldCheck } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: 'Habit Formation',
      description: 'Streaks act as psychological triggers that turn learning into a daily habit, significantly boosting retention.',
    },
    {
      icon: Heart,
      title: 'Positive Reinforcement',
      description: 'Micro-rewards, point multipliers, and streak savers ensure positive feedback at every point of lesson progression.',
    },
    {
      icon: Database,
      title: 'Engineered at Scale',
      description: 'Built with dual caching structures. Streak evaluations write instantly, while leaderboard queries pull from pre-computed Redis caches under 1ms.',
    },
    {
      icon: ShieldCheck,
      title: 'Anti-Gaming Protections',
      description: 'Integrated rate limiters and write guards prevent double completions, ensuring leaderboard integrity.',
    },
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 bg-muted/5 border-b border-border/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Side title column */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-primary">
              Why Cerevia
            </span>
            <h2 className="text-3xl font-serif font-light tracking-wide text-foreground sm:text-4xl">
              Engineered for learning retention and high performance
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light tracking-wide">
              We separate heavy database read operations from high-write actions to serve learning telemetry smoothly to millions of active users.
            </p>
          </div>

          {/* Benefits Grid list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-[#090909] border border-border/10 rounded-none flex gap-4 shadow-none hover:border-primary/20 transition-colors"
                >
                  <div className="h-9 w-9 rounded-none bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shrink-0">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xs font-medium tracking-wide uppercase font-sans text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
