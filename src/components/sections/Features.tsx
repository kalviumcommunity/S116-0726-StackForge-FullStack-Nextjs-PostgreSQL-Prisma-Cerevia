import * as React from 'react';
import { BookOpen, Flame, Trophy, BarChart3, Award, User, type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-none border border-border/10 bg-[#090909] p-6 shadow-none transition-all duration-300 hover:border-primary/20 flex flex-col gap-3">
      <div className="h-10 w-10 rounded-none bg-secondary/80 flex items-center justify-center text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Icon className="h-5 w-5 shrink-0" />
      </div>
      <h3 className="text-sm font-medium tracking-wide text-foreground uppercase font-sans">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed font-light">
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
    <section id="features" className="py-20 md:py-28 bg-muted/5 border-b border-border/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-primary">
            Features Overview
          </span>
          <h2 className="text-3xl font-serif font-light tracking-wide text-foreground sm:text-4xl">
            Everything you need to learn consistently
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-light tracking-wide">
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
