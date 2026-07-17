'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Sparkles, Flame, Loader2 } from 'lucide-react';
import api from '@/services/api';

interface XpHistoryItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

interface XpData {
  totalXP: number;
  levelInfo?: {
    level: number;
    xpInCurrentLevel: number;
  };
  history?: XpHistoryItem[];
}

interface UserProfile {
  currentStreak: number;
}

export default function XpPage() {
  const [loading, setLoading] = useState(true);
  const [xpData, setXpData] = useState<XpData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadXpData() {
      try {
        const [xpRes, profileRes] = await Promise.all([
          api.get<XpData>('/api/user/xp?limit=20'),
          api.get<UserProfile>('/api/user/profile'),
        ]);

        if (xpRes.success && xpRes.data) {
          setXpData(xpRes.data);
        }
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch XP tracking data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadXpData();
  }, []);

  const totalXP = xpData?.totalXP || 0;
  const currentLevel = xpData?.levelInfo?.level || 1;
  const xpInCurrentLevel = xpData?.levelInfo?.xpInCurrentLevel || 0;
  const xpForNextLevel = 100; // Each level takes 100 XP
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpForNextLevel) * 100));
  
  // Streak booster multiplier calculation
  const streak = profile?.currentStreak || 0;
  let streakMultiplier = 1.0;
  if (streak >= 14) streakMultiplier = 1.5;
  else if (streak >= 7) streakMultiplier = 1.25;
  else if (streak >= 3) streakMultiplier = 1.1;

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="XP Tracker & History"
        description="Track your experience points, streak multipliers, and history of completed milestones."
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* XP Balance Widget */}
          <Section title="XP Balance" description="Your total earned experience points.">
            <div className="flex flex-col items-center justify-center p-6 text-center bg-[#090909] border border-border/10 rounded-none min-h-[160px]">
              <div className="h-16 w-16 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <span className="text-3xl font-serif font-light text-primary tracking-wide">{totalXP} XP</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/60 mt-1">Level {currentLevel} Backend Scholar</span>
            </div>
          </Section>

          {/* XP Multipliers Widget */}
          <Section title="Active Multipliers" description="XP bonuses active on your account.">
            <div className="space-y-4 bg-[#090909] border border-border/10 rounded-none p-6 min-h-[160px] flex flex-col justify-center">
              <div className="flex justify-between items-center py-2 border-b border-border/10">
                <span className="text-xs text-muted-foreground/60 font-sans uppercase tracking-wider font-light flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-primary fill-primary shrink-0 animate-pulse" />
                  Streak Multiplier ({streak} Days)
                </span>
                <span className="text-xs font-sans font-medium text-primary">{streakMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-muted-foreground/60 font-sans uppercase tracking-wider font-light">Effective XP Multiplier</span>
                <span className="text-[10px] font-sans uppercase tracking-wider font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-none">{streakMultiplier.toFixed(2)}x</span>
              </div>
            </div>
          </Section>

          {/* Milestones Target Widget */}
          <Section title="Next Milestone" description="Progress towards your next reward tier.">
            <div className="space-y-4 bg-[#090909] border border-border/10 rounded-none p-6 min-h-[160px] flex flex-col justify-center">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground/60 font-sans uppercase tracking-wider font-light">Progress to Level {currentLevel + 1}</span>
                  <span className="font-sans font-medium text-white">{xpInCurrentLevel} / {xpForNextLevel} XP</span>
                </div>
                <div className="h-1.5 w-full bg-black rounded-none overflow-hidden border border-border/10">
                  <div className="h-full bg-primary rounded-none transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <p className="text-[10px] font-sans font-light text-muted-foreground/60 leading-relaxed">
                Earn {xpForNextLevel - xpInCurrentLevel} more XP to reach Level {currentLevel + 1} and advance your backend scholar status.
              </p>
            </div>
          </Section>
        </div>

        {/* XP Log */}
        <Section title="XP History Log" description="A record of recent XP events.">
          <div className="divide-y divide-border/10 bg-[#090909] border border-border/10 rounded-none p-8">
            {xpData?.history && xpData.history.length > 0 ? (
              xpData.history.map((item: XpHistoryItem) => (
                <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-sans uppercase tracking-wide font-medium text-white leading-tight">{item.reason}</span>
                    <span className="text-[9px] font-sans text-muted-foreground/45 tracking-wider uppercase">
                      {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-xs font-sans font-medium tracking-wide text-primary">+{item.xpEarned} XP</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-[10px] font-sans uppercase tracking-wider font-light text-muted-foreground/40">
                No experience point events have been logged yet. Complete a lesson to begin.
              </div>
            )}
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
