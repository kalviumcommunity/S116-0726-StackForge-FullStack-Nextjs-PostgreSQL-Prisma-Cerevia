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
    <section id="benefits" className="py-16 md:py-24 bg-muted/10 border-b border-border/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Side title column */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Why Cerevia
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for learning retention and high performance
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
                  className="p-6 bg-card border border-border rounded-xl flex gap-4 shadow-sm hover:border-orange-500/20 transition-colors"
                >
                  <div className="h-9 w-9 rounded-lg bg-orange-500/5 text-orange-500 flex items-center justify-center border border-orange-500/10 shrink-0">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xs font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
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
