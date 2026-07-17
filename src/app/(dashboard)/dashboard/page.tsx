'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Sparkles, Trophy, Flame, Target, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';

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
          api.get<any>('/api/lessons/progress'),
          api.get<any>('/api/user/leaderboard/rank'),
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
  const nextLevelXP = currentLevel * 100;
  const prevLevelXP = (currentLevel - 1) * 100;
  const xpInCurrentLevel = currentXP - prevLevelXP;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / 100) * 100));

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard Overview"
        description={`Welcome back, ${user?.fullName || 'Student'}! Monitor your learning momentum and competitive standing.`}
        actions={
          <div className="flex items-center gap-2 text-xs font-bold text-orange-400 bg-orange-950/45 border border-orange-500/20 px-3.5 py-1.5 rounded-full select-none shadow-md shadow-orange-500/5">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>Streak Active</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        {/* Core Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Streak Engine */}
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 flex flex-col justify-between hover:bg-gray-950/70 hover:border-orange-500/20 transition-all shadow-lg hover:shadow-orange-500/5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">Daily Streak</p>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">{user?.currentStreak || 0} Days</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-orange-950/45 border border-orange-500/20 flex items-center justify-center text-orange-500">
                <Flame className="h-5 w-5 fill-orange-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-900/60 flex items-center justify-between text-xs text-gray-400">
              <span>All-Time Record:</span>
              <span className="font-bold text-orange-400">{user?.maxStreak || 0} days</span>
            </div>
          </Card>

          {/* Card 2: XP / Gamification Level */}
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 flex flex-col justify-between hover:bg-gray-950/70 hover:border-cyan-500/20 transition-all shadow-lg hover:shadow-cyan-500/5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">Level {currentLevel}</p>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">{currentXP} XP</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-cyan-950/45 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Target className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500">
                <span>{xpInCurrentLevel}/100 XP to Level {currentLevel + 1}</span>
              </div>
            </div>
          </Card>

          {/* Card 3: Leaderboard Position */}
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 flex flex-col justify-between hover:bg-gray-950/70 hover:border-purple-500/20 transition-all shadow-lg hover:shadow-purple-500/5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">Weekly Rank</p>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">
                  {loading ? '...' : stats?.rank ? `#${stats.rank}` : 'Unranked'}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-purple-950/45 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-900/60 flex items-center justify-between text-xs text-gray-400">
              <span>Weekly Accumulated Score:</span>
              <span className="font-bold text-purple-400">{loading ? '...' : `${stats?.weeklyXP || 0} XP`}</span>
            </div>
          </Card>
        </div>

        {/* Dynamic Action Section & Upcoming Lessons */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Action Banner */}
          <div className="md:col-span-2 rounded-2xl border border-gray-900 bg-gradient-to-b from-gray-950/45 to-gray-950/20 p-6 flex flex-col justify-between backdrop-blur-sm min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Next Objective</span>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-2 mt-4">
                  <div className="h-6 w-1/2 bg-gray-800 rounded" />
                  <div className="h-4 w-5/6 bg-gray-800 rounded" />
                </div>
              ) : stats?.nextLesson ? (
                <div className="space-y-2 mt-2">
                  <h4 className="text-xl font-bold text-white tracking-tight">{stats.nextLesson.title}</h4>
                  <p className="text-sm text-gray-400 font-normal leading-relaxed">
                    Advance your backend engineering credentials and gain <span className="text-cyan-400 font-semibold">+{stats.nextLesson.xpReward} XP</span>.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <h4 className="text-xl font-bold text-white tracking-tight">Syllabus Completed!</h4>
                  <p className="text-sm text-gray-400 font-normal leading-relaxed">
                    Awesome job! You have completed all available course modules. Keep competing in the weekly leaderboards.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              {loading ? (
                <div className="h-10 w-32 bg-gray-800 rounded-xl animate-pulse" />
              ) : stats?.nextLesson ? (
                <Link href={`/lessons/${stats.nextLesson.id}`}>
                  <Button variant="primary" className="group font-bold text-xs px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/15">
                    <span>Resume Syllabus</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/lessons">
                  <Button variant="outline" className="font-bold text-xs px-4 py-2.5 border-gray-800 text-white hover:bg-gray-900">
                    Browse All Lessons
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Syllabus Status */}
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 flex flex-col justify-between hover:bg-gray-950/70 transition-all shadow-lg">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white tracking-tight font-sans">Syllabus Progress</h4>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-gray-800 rounded-xl" />
                  <div className="h-12 bg-gray-800 rounded-xl" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Modules Mastered:</span>
                    <span className="font-semibold text-white">{stats?.completedCount} / {stats?.totalCount}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stats ? (stats.completedCount / stats.totalCount) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="pt-2 flex items-start gap-2 text-[10px] text-gray-500 font-medium leading-relaxed">
                    <AlertCircle className="h-3.5 w-3.5 text-gray-500 shrink-0 mt-0.5" />
                    <span>Complete at least one lesson every 24 hours to keep your streak alive.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-900/60">
              <Link href="/lessons" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
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
