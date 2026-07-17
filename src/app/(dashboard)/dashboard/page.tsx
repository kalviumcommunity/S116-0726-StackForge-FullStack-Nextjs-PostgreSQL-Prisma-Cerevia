'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Sparkles, Trophy, Flame, Target, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';

interface LessonProgress {
  totalCompleted: number;
  remainingLessons: { id: string; title: string; difficulty: string; xpReward: number }[];
}

interface LeaderboardRank {
  rank: number;
  weeklyXP: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    completedCount: number;
    totalCount: number;
    nextLesson: { id: string; title: string; difficulty: string; xpReward: number } | null;
    rank: number;
    weeklyXP: number;
  } | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [progressRes, rankRes] = await Promise.all([
          api.get<LessonProgress>('/api/lessons/progress'),
          api.get<LeaderboardRank>('/api/user/leaderboard/rank'),
        ]);

        if (progressRes.success && progressRes.data && rankRes.success && rankRes.data) {
          const completedCount = progressRes.data.totalCompleted;
          const totalCount = completedCount + progressRes.data.remainingLessons.length;
          const nextLesson = progressRes.data.remainingLessons[0] || null;
          
          setStats({
            completedCount,
            totalCount,
            nextLesson,
            rank: rankRes.data.rank,
            weeklyXP: rankRes.data.weeklyXP,
          });
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  // Compute level: Each level is 100 XP
  const currentXP = user?.totalXP || 0;
  const currentLevel = Math.floor(currentXP / 100) + 1;
  const prevLevelXP = (currentLevel - 1) * 100;
  const xpInCurrentLevel = currentXP - prevLevelXP;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / 100) * 100));

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard Overview"
        description={`Welcome back, ${user?.fullName || 'Student'}! Monitor your learning momentum and competitive standing.`}
        actions={
          <div className="flex items-center gap-2 text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-none select-none">
            <Flame className="h-3.5 w-3.5 text-primary fill-primary animate-pulse" />
            <span>Streak Active</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        {/* Core Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Streak Engine */}
          <Card className="p-8 flex flex-col justify-between hover:border-primary/25 hover:bg-[#0c0c0c] transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-sans font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">Daily Streak</p>
                <h3 className="text-3xl font-serif font-light text-white tracking-wide">{user?.currentStreak || 0} Days</h3>
              </div>
              <div className="h-9 w-9 rounded-none bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                <Flame className="h-4.5 w-4.5 fill-primary" />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border/10 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/60 font-light">
              <span>All-Time Record:</span>
              <span className="font-medium text-primary">{user?.maxStreak || 0} days</span>
            </div>
          </Card>

          {/* Card 2: XP / Gamification Level */}
          <Card className="p-8 flex flex-col justify-between hover:border-primary/25 hover:bg-[#0c0c0c] transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-sans font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">Level {currentLevel}</p>
                <h3 className="text-3xl font-serif font-light text-white tracking-wide">{currentXP} XP</h3>
              </div>
              <div className="h-9 w-9 rounded-none bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                <Target className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="w-full bg-[#161616] h-[3px] rounded-none overflow-hidden border border-border/5">
                <div 
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] font-sans uppercase tracking-[0.15em] text-muted-foreground/60">
                <span>{xpInCurrentLevel}/100 XP to Level {currentLevel + 1}</span>
              </div>
            </div>
          </Card>

          {/* Card 3: Leaderboard Position */}
          <Card className="p-8 flex flex-col justify-between hover:border-primary/25 hover:bg-[#0c0c0c] transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-sans font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">Weekly Rank</p>
                <h3 className="text-3xl font-serif font-light text-white tracking-wide">
                  {loading ? '...' : stats?.rank ? `#${stats.rank}` : 'Unranked'}
                </h3>
              </div>
              <div className="h-9 w-9 rounded-none bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                <Trophy className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border/10 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/60 font-light">
              <span>Weekly Accumulated Score:</span>
              <span className="font-medium text-primary">{loading ? '...' : `${stats?.weeklyXP || 0} XP`}</span>
            </div>
          </Card>
        </div>

        {/* Dynamic Action Section & Upcoming Lessons */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Action Banner */}
          <div className="md:col-span-2 rounded-none border border-border/10 bg-[#090909] p-8 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-sans font-medium text-primary uppercase tracking-[0.2em]">Next Objective</span>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-2 mt-4">
                  <div className="h-6 w-1/2 bg-gray-800 rounded" />
                  <div className="h-4 w-5/6 bg-gray-800 rounded" />
                </div>
              ) : stats?.nextLesson ? (
                <div className="space-y-2 mt-2">
                  <h4 className="text-xl font-serif font-light text-white tracking-wide">{stats.nextLesson.title}</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Advance your credentials and gain <span className="text-primary font-medium">+{stats.nextLesson.xpReward} XP</span>.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <h4 className="text-xl font-serif font-light text-white tracking-wide">Syllabus Completed!</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Awesome job! You have completed all available course modules. Keep competing in the weekly leaderboards.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              {loading ? (
                <div className="h-10 w-32 bg-gray-800 rounded-none animate-pulse" />
              ) : stats?.nextLesson ? (
                <Link href={`/lessons/${stats.nextLesson.id}`}>
                  <Button variant="primary" className="group font-sans px-5 py-2.5">
                    <span>Resume Syllabus</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/lessons">
                  <Button variant="outline" className="font-sans px-5 py-2.5">
                    Browse All Lessons
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Syllabus Status */}
          <Card className="p-8 flex flex-col justify-between hover:border-primary/25 transition-all duration-300">
            <div className="space-y-4">
              <h4 className="text-[10px] font-sans font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">Syllabus Progress</h4>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-gray-850 rounded-none" />
                  <div className="h-12 bg-gray-850 rounded-none" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-sans text-muted-foreground/80 font-light">
                    <span>Modules Mastered:</span>
                    <span className="font-medium text-white">{stats?.completedCount} / {stats?.totalCount}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-[#161616] h-[3px] rounded-none overflow-hidden border border-border/5">
                    <div 
                      className="bg-primary h-full transition-all duration-500"
                      style={{ width: `${stats ? (stats.completedCount / stats.totalCount) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="pt-2 flex items-start gap-2 text-[10px] text-muted-foreground/50 font-light leading-relaxed">
                    <AlertCircle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
                    <span>Complete lessons regularly to keep your learning momentum active.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border/10">
              <Link href="/lessons" className="text-[10px] font-sans uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                <span>Go to Syllabus</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
