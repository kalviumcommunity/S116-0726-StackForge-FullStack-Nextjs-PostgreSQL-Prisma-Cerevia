import { BookOpen, Flame, Trophy, BarChart3, Award, User, type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-500/20 flex flex-col gap-3">
      <div className="h-10 w-10 rounded-lg bg-secondary/80 flex items-center justify-center text-foreground group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
        <Icon className="h-5 w-5 shrink-0" />
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'Daily Lessons',
      description: 'Access short-form, structured video lessons and quick assessments designed to build learning consistency.',
    },
    {
      icon: Flame,
      title: 'XP & Streak Tracking',
      description: 'Keep your momentum active. Watch your daily streak grow and collect score multipliers on consecutive learning days.',
    },
    {
      icon: Trophy,
      title: 'Weekly Leaderboards',
      description: 'Compete against other students in real time. Climb divisions and claim leaderboard achievements.',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Analyze your weekly accuracy and performance curves. Spot gaps and get smart suggestions to optimize scores.',
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Unlock special badges and milestone certificates as you hit streak peaks and master lesson sections.',
    },
    {
      icon: User,
      title: 'User Profiles',
      description: 'Customize student profiles, showcase streak milestones, and display earned accomplishments in one shareable card.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/10 border-b border-border/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            Features Overview
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to learn consistently
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Cerevia combines educational structures with high-engagement gaming loops to help you build lifetime learning habits.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
