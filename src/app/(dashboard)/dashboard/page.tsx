'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { useAuth } from '@/providers/AuthProvider';
import { Sparkles, Trophy, Flame, Target, ChevronRight, AlertCircle, BookOpen } from 'lucide-react';
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
    <PageContainer className="bg-slate-50/60 min-h-screen">
      <PageHeader
        title="Student Workspace"
        description={`Welcome back, ${user?.fullName || 'Student'}! Monitor your learning momentum and competitive standing.`}
        actions={
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
            <Flame className="h-4 w-4 text-blue-600 fill-blue-600" />
            <span>Learning Momentum Active</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        {/* Core Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Streak Engine */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Streak</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{user?.currentStreak || 0} Days</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
                <Flame className="h-5 w-5 fill-blue-600" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">All-Time Record:</span>
              <span className="font-bold text-blue-700">{user?.maxStreak || 0} days</span>
            </div>
          </div>

          {/* Card 2: XP / Gamification Level */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Level {currentLevel} Scholar</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{currentXP} XP</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
                <Target className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{xpInCurrentLevel}/100 XP to Level {currentLevel + 1}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Leaderboard Position */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Rank</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {loading ? '...' : stats?.rank ? `#${stats.rank}` : 'Unranked'}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Weekly Accumulated Score:</span>
              <span className="font-bold text-blue-700">{loading ? '...' : `${stats?.weeklyXP || 0} XP`}</span>
            </div>
          </div>

        </div>

        {/* Dynamic Action Section & Upcoming Lessons */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Main Action Banner */}
          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between min-h-[220px] shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Next Recommended Module</span>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-2 mt-4">
                  <div className="h-6 w-1/2 bg-slate-100 rounded" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
              ) : stats?.nextLesson ? (
                <div className="space-y-2 mt-2">
                  <h4 className="text-2xl font-black text-slate-900">{stats.nextLesson.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Advance your engineering credentials and earn <span className="text-blue-700 font-bold">+{stats.nextLesson.xpReward} XP</span> upon completion.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <h4 className="text-2xl font-black text-slate-900">Syllabus Completed!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Awesome job! You have completed all available course modules. Keep competing in the weekly leaderboards.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              {loading ? (
                <div className="h-10 w-32 bg-slate-100 rounded animate-pulse" />
              ) : stats?.nextLesson ? (
                <Link href={`/lessons/${stats.nextLesson.id}`}>
                  <button className="flex items-center gap-2 font-bold text-xs bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md">
                    <span>Resume Syllabus</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              ) : (
                <Link href="/lessons">
                  <button className="flex items-center gap-2 font-bold text-xs bg-slate-100 text-slate-700 px-5 py-3 rounded-xl hover:bg-slate-200 transition-colors">
                    Browse All Lessons
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Syllabus Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Syllabus Mastery</h4>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-slate-100 rounded" />
                  <div className="h-12 bg-slate-100 rounded" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-medium">Modules Mastered:</span>
                    <span className="font-black text-slate-900">{stats?.completedCount} / {stats?.totalCount}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${stats ? (stats.completedCount / stats.totalCount) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="pt-2 flex items-start gap-2 text-[11px] text-slate-500 font-normal leading-relaxed">
                    <AlertCircle className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Complete lessons regularly to maintain your course streak and climb divisions.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link href="/lessons" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                <span>Go to Syllabus</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
