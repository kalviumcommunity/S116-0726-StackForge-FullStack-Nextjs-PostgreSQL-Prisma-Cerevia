import * as React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Sparkles, Trophy, Calendar } from 'lucide-react';

export default function XpPage() {
  const mockXPHistory = [
    { id: 1, action: 'Completed Lesson: Database Sharding', xp: 250, date: 'Today' },
    { id: 2, action: 'Daily Streak Bonus (Day 12)', xp: 100, date: 'Today' },
    { id: 3, action: 'Completed Lesson: Intro to Cerevia', xp: 100, date: 'Yesterday' },
    { id: 4, action: 'Weekly Leaderboard Multiplier (1.25x)', xp: 50, date: '2 days ago' },
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header */}
        <div className="flex flex-col gap-1.5 pb-6 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">XP Tracker & History</h1>
          <p className="text-xs text-muted-foreground">
            Track your experience points, streak multipliers, and history of completed milestones.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* XP Balance Widget */}
          <Section title="XP Balance" description="Your total earned experience points.">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <span className="text-3xl font-extrabold text-orange-500">2,450 XP</span>
              <span className="text-xs text-muted-foreground mt-1">Level 4 Scholar</span>
            </div>
          </Section>

          {/* XP Multipliers Widget */}
          <Section title="Active Multipliers" description="XP bonuses active on your account.">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/40">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  Streak Multiplier (12 Days)
                </span>
                <span className="text-xs font-bold text-orange-500">1.25x</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/40">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  Leaderboard Multiplier (Top 5)
                </span>
                <span className="text-xs font-bold text-orange-500">1.1x</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-muted-foreground">Effective Multiplier</span>
                <span className="text-xs font-black text-foreground">1.375x</span>
              </div>
            </div>
          </Section>

          {/* Milestones Target Widget */}
          <Section title="Next Milestone" description="Progress towards your next reward tier.">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress to Level 5</span>
                  <span className="font-semibold text-foreground">2,450 / 3,000 XP</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '81.6%' }} />
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Earn 550 more XP to unlock the Level 5 Scholar Badge and increase your base streak multiplier.
              </p>
            </div>
          </Section>
        </div>

        {/* XP Log */}
        <Section title="XP History Log" description="A record of recent XP events.">
          <div className="divide-y divide-border/40">
            {mockXPHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">{item.action}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
                <span className="text-sm font-bold text-orange-500">+{item.xp} XP</span>
              </div>
            ))}
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
