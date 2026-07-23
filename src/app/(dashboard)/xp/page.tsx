'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Sparkles, Flame, Loader2, Award, Clock } from 'lucide-react';
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
  const xpForNextLevel = 100;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpForNextLevel) * 100));
  
  const streak = profile?.currentStreak || 0;
  let streakMultiplier = 1.0;
  if (streak >= 14) streakMultiplier = 1.5;
  else if (streak >= 7) streakMultiplier = 1.25;
  else if (streak >= 3) streakMultiplier = 1.1;

  if (loading) {
    return (
      <PageContainer className="bg-slate-50/60 min-h-screen">
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="bg-slate-50/60 min-h-screen">
      <PageHeader
        title="XP Tracker & History"
        description="Track your experience points, streak multipliers, and history of completed milestones."
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* XP Balance Widget */}
          <Section title="XP Balance" description="Your total earned experience points.">
            <div className="flex flex-col items-center justify-center p-6 text-center bg-white border border-slate-200 rounded-2xl shadow-xs min-h-[160px]">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3">
                <Sparkles className="h-7 w-7" />
              </div>
              <span className="text-3xl font-black text-blue-700">{totalXP} XP</span>
              <span className="text-xs font-bold text-slate-500 mt-1">Level {currentLevel} Scholar</span>
            </div>
          </Section>

          {/* Level Progress Widget */}
          <Section title="Level Progress" description="Progress towards the next tier.">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Level {currentLevel}</span>
                  <span className="text-blue-700">Level {currentLevel + 1}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <p className="text-xs font-medium text-slate-500 text-center mt-4">
                {xpInCurrentLevel} / {xpForNextLevel} XP ({progressPercent.toFixed(0)}%)
              </p>
            </div>
          </Section>

          {/* Streak Booster Widget */}
          <Section title="Streak Booster" description="Active multiplier rate.">
            <div className="flex flex-col items-center justify-center p-6 text-center bg-white border border-slate-200 rounded-2xl shadow-xs min-h-[160px]">
              <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
                <Flame className="h-7 w-7 fill-amber-500" />
              </div>
              <span className="text-3xl font-black text-amber-700">{streakMultiplier}x</span>
              <span className="text-xs font-bold text-slate-500 mt-1">{streak} Day Active Streak</span>
            </div>
          </Section>

        </div>

        {/* History Table */}
        <Section title="XP History Log" description="Recent milestones and experience awards.">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            {xpData?.history && xpData.history.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {xpData.history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 text-xs">
                    <div className="flex items-center gap-3">
                      <Award className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-bold text-slate-900">{item.reason}</p>
                        <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-black text-blue-700 text-sm">
                      +{item.xpEarned} XP
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-slate-400">
                No XP history logs recorded yet.
              </div>
            )}
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
