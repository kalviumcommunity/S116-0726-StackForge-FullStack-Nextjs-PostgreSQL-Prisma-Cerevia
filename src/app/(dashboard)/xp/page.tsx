'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Sparkles, Trophy, Calendar, Flame, Loader2 } from 'lucide-react';
import api from '@/services/api';

interface XpHistoryItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

export default function XpPage() {
  const [loading, setLoading] = useState(true);
  const [xpData, setXpData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadXpData() {
      try {
        const [xpRes, profileRes] = await Promise.all([
          api.get<any>('/api/user/xp?limit=20'),
          api.get<any>('/api/user/profile'),
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
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
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
            <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-950/20 border border-gray-900 rounded-2xl min-h-[160px]">
              <div className="h-16 w-16 rounded-2xl bg-cyan-950/45 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-md shadow-cyan-500/5">
                <Sparkles className="h-7 w-7" />
              </div>
              <span className="text-3xl font-extrabold text-cyan-400 tracking-tight">{totalXP} XP</span>
              <span className="text-xs text-gray-400 font-semibold mt-1">Level {currentLevel} Backend Scholar</span>
            </div>
          </Section>

          {/* XP Multipliers Widget */}
          <Section title="Active Multipliers" description="XP bonuses active on your account.">
            <div className="space-y-4 bg-gray-950/20 border border-gray-900 rounded-2xl p-6 min-h-[160px] flex flex-col justify-center">
              <div className="flex justify-between items-center py-2 border-b border-gray-900/60">
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500 fill-orange-500 shrink-0" />
                  Streak Multiplier ({streak} Days)
                </span>
                <span className="text-xs font-bold text-orange-400">{streakMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-400 font-medium">Effective XP Multiplier</span>
                <span className="text-xs font-bold text-white bg-cyan-950/45 border border-cyan-500/25 px-2 py-0.5 rounded-full">{streakMultiplier.toFixed(2)}x</span>
              </div>
            </div>
          </Section>

          {/* Milestones Target Widget */}
          <Section title="Next Milestone" description="Progress towards your next reward tier.">
            <div className="space-y-4 bg-gray-950/20 border border-gray-900 rounded-2xl p-6 min-h-[160px] flex flex-col justify-center">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Progress to Level {currentLevel + 1}</span>
                  <span className="font-bold text-white">{xpInCurrentLevel} / {xpForNextLevel} XP</span>
                </div>
                <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-normal">
                Earn {xpForNextLevel - xpInCurrentLevel} more XP to reach Level {currentLevel + 1} and advance your backend scholar status.
              </p>
            </div>
          </Section>
        </div>

        {/* XP Log */}
        <Section title="XP History Log" description="A record of recent XP events.">
          <div className="divide-y divide-gray-900/60 bg-gray-950/20 border border-gray-900 rounded-2xl p-6 shadow-lg">
            {xpData?.history && xpData.history.length > 0 ? (
              xpData.history.map((item: XpHistoryItem) => (
                <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-white leading-tight">{item.reason}</span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">+{item.xpEarned} XP</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-gray-500 font-medium">
                No experience point events have been logged yet. Complete a lesson to begin.
              </div>
            )}
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
