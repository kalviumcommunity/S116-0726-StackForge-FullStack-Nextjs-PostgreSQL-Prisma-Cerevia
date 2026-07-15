'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Trophy,
  BookOpen,
  Calendar,
  ArrowRight,
  Zap,
  Award,
  History,
  Target,
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { dashboardService } from '@/services/dashboard.service';
import {
  UserProfileInfo,
  UserXpResponse,
  StreakInfo,
  UserRankInfo,
  UserProgressResponse,
} from '@/types';

interface DashboardData {
  profile: UserProfileInfo;
  xp: UserXpResponse;
  streak: StreakInfo;
  rank: UserRankInfo;
  progress: UserProgressResponse;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [profileRes, xpRes, streakRes, rankRes, progressRes] = await Promise.all([
        dashboardService.fetchUserProfile(),
        dashboardService.fetchXpDetails(5),
        dashboardService.fetchStreakDetails(),
        dashboardService.fetchUserLeaderboardRank(),
        dashboardService.fetchLessonsProgress(),
      ]);

      if (!profileRes.success || !profileRes.data) {
        throw new Error(profileRes.error?.message || 'Failed to fetch user profile.');
      }
      if (!xpRes.success || !xpRes.data) {
        throw new Error(xpRes.error?.message || 'Failed to fetch XP details.');
      }
      if (!streakRes.success || !streakRes.data) {
        throw new Error(streakRes.error?.message || 'Failed to fetch streak details.');
      }
      if (!rankRes.success || !rankRes.data) {
        throw new Error(rankRes.error?.message || 'Failed to fetch leaderboard rank.');
      }
      if (!progressRes.success || !progressRes.data) {
        throw new Error(progressRes.error?.message || 'Failed to fetch lessons progress.');
      }

      setData({
        profile: profileRes.data,
        xp: xpRes.data,
        streak: streakRes.data,
        rank: rankRes.data,
        progress: progressRes.data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A connection or server error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    // Hydration-safe date formatting
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, [loadDashboardData]);

  const displayName = data?.profile?.fullName || 'Learner';

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to Load Dashboard"
          message={error}
          onRetry={loadDashboardData}
          retryText="Retry Loading"
        />
      </PageContainer>
    );
  }

  if (isLoading || !data) {
    return (
      <PageContainer>
        <div className="flex flex-col gap-6 animate-pulse">
          {/* Welcome header skeleton */}
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          {/* Cards skeleton grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>

          {/* Main content skeleton */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <Skeleton className="h-6 w-36" />
                <div className="border border-border rounded-lg p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <Skeleton className="h-6 w-36" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-5 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  const { profile, xp, streak, rank, progress } = data;
  const nextLesson = progress.remainingLessons[0];
  const totalLessons = progress.totalCompleted + progress.remainingLessons.length;
  const curriculumProgress =
    totalLessons > 0 ? Math.round((progress.totalCompleted / totalLessons) * 100) : 0;

  const streakColors = {
    active: {
      bg: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
      fill: 'text-orange-500 fill-orange-500',
      message: "You're doing great! Keep the momentum going.",
    },
    at_risk: {
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-500 animate-pulse',
      fill: 'text-amber-500 fill-amber-500',
      message: 'Complete a lesson today to save your streak!',
    },
    inactive: {
      bg: 'bg-muted border-border text-muted-foreground',
      fill: 'text-muted-foreground',
      message: 'Start a lesson to begin a new learning streak.',
    },
  }[streak.status || 'inactive'];

  return (
    <PageContainer>
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border bg-gradient-to-r from-card/60 to-background rounded-xl p-6 shadow-sm border border-border/80">
        <div className="flex items-center gap-4">
          <Avatar
            src={profile.avatar || undefined}
            alt={displayName}
            fallback={displayName}
            size="lg"
            className="border-2 border-primary/20 ring-2 ring-primary/5 shadow"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, {displayName}!
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Ready to continue your learning journey? Complete lessons to build your streak.
            </p>
          </div>
        </div>
        {currentDate && (
          <div className="flex items-center gap-2 self-start sm:self-center text-xs font-semibold text-muted-foreground bg-secondary px-3.5 py-1.5 rounded-full border border-border">
            <Calendar className="h-3.5 w-3.5" />
            <span>{currentDate}</span>
          </div>
        )}
      </div>

      <ContentWrapper>
        {/* Primary Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* XP Card */}
          <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-none bg-transparent space-y-0">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Experience Points
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/15">
                <Zap className="h-4.5 w-4.5" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-foreground tracking-tight">
                  {profile.totalXP}
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase">Total XP</span>
              </div>

              {/* Level progress tracker */}
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-primary font-bold">Level {xp.levelInfo.level}</span>
                  <span className="text-muted-foreground">
                    {xp.levelInfo.progressPercentage}% to Lvl {xp.levelInfo.level + 1}
                  </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border/30">
                  <div
                    className="h-full bg-gradient-to-r from-primary/85 to-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${xp.levelInfo.progressPercentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground leading-normal">
                  {xp.levelInfo.xpRemaining} XP remaining to reach level {xp.levelInfo.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border-border hover:border-orange-500/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-none bg-transparent space-y-0">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Learning Streak
              </CardTitle>
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center border ${streakColors.bg}`}
              >
                <Flame className={`h-4.5 w-4.5 ${streakColors.fill}`} />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-foreground tracking-tight">
                  {streak.currentStreak}
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase">
                  {streak.currentStreak === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              <div className="space-y-2 mt-auto">
                <p className="text-xs font-semibold text-foreground leading-normal">
                  {streakColors.message}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span>
                    Personal Best:{' '}
                    <strong className="text-foreground">{profile.maxStreak} days</strong>
                  </span>
                  {streak.lastActivityAt && (
                    <span>
                      Last active:{' '}
                      <strong className="text-foreground">
                        {new Date(streak.lastActivityAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </strong>
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard standing */}
          <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border-border hover:border-yellow-500/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-none bg-transparent space-y-0">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Weekly Standing
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 border border-yellow-500/15">
                <Trophy className="h-4.5 w-4.5 fill-yellow-500/10" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-foreground tracking-tight">
                  #{rank.rank}
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase">Place</span>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground">Weekly Score</span>
                  <span className="text-yellow-600 font-bold">+{rank.weeklyXP} XP</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-normal">
                  You are competing in the weekly leaderboard with {rank.totalParticipants}{' '}
                  participants. Complete lessons to rank higher!
                </p>
                <div className="pt-2">
                  <Link href="/leaderboard" passHref legacyBehavior>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-[11px] text-yellow-600 font-bold hover:text-yellow-500 flex items-center gap-1 hover:no-underline"
                    >
                      <span>Leaderboard Rank Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning & Activities layouts */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Continue Learning component */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Section title="Continue Learning" description="Resume your syllabus and active lesson">
              {nextLesson ? (
                <div className="flex flex-col gap-6 border border-border bg-card/30 rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-foreground leading-tight tracking-tight">
                        {nextLesson.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Complete this lesson now to earn bonus experience points and level up!
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0 self-start sm:self-center">
                      <Badge variant="secondary">{nextLesson.difficulty}</Badge>
                      <Badge variant="success">+{nextLesson.xpReward} XP</Badge>
                    </div>
                  </div>

                  {/* Course overall syllabus completion bar */}
                  <div className="space-y-2 pt-2 border-t border-border/40">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-primary/70" />
                        <span>Curriculum Completion Progress</span>
                      </div>
                      <span className="text-foreground">{curriculumProgress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden border border-border/30">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${curriculumProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href={`/lessons/${nextLesson.id}`} passHref legacyBehavior>
                      <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                        Resume Lesson
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <EmptyState
                  title="Course Completed!"
                  description="Amazing work! You've finished all available lessons in this curriculum. Keep an eye out for updates, or review your completed lessons."
                  icon={<Award className="h-6 w-6" />}
                  action={
                    <Link href="/lessons" passHref legacyBehavior>
                      <Button variant="outline">Review Lessons</Button>
                    </Link>
                  }
                />
              )}
            </Section>
          </div>

          {/* Recent Activity component */}
          <div className="lg:col-span-1">
            <Section
              title="Recent Activity"
              description="Chronological log of your gamified achievements"
              headerAction={
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <History className="h-4 w-4 text-muted-foreground" />
                </div>
              }
            >
              {xp.history.length > 0 ? (
                <div className="space-y-3.5">
                  {xp.history.map((record) => {
                    let activityLabel = 'Earned XP';
                    let activityIcon = <Zap className="h-4 w-4 text-primary" />;
                    let iconBg = 'bg-primary/10 border-primary/15';

                    if (record.reason === 'LESSON_COMPLETION') {
                      activityLabel = `Completed "${record.lesson?.title || 'Lesson'}"`;
                      activityIcon = <BookOpen className="h-4 w-4 text-primary" />;
                      iconBg = 'bg-primary/10 border-primary/15';
                    } else if (record.reason === 'DAILY_STREAK') {
                      activityLabel = 'Daily streak multiplier';
                      activityIcon = (
                        <Flame className="h-4 w-4 text-orange-500 fill-orange-500/10" />
                      );
                      iconBg = 'bg-orange-500/10 border-orange-500/15';
                    } else if (record.reason === 'ACHIEVEMENT') {
                      activityLabel = 'Unlocked achievement badge';
                      activityIcon = <Award className="h-4 w-4 text-yellow-600" />;
                      iconBg = 'bg-yellow-500/10 border-yellow-500/15';
                    }

                    const activityDateStr = new Date(record.timestamp).toLocaleDateString(
                      undefined,
                      {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    );

                    return (
                      <div
                        key={record.id}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:bg-card/65 transition-colors duration-150"
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center border shrink-0 ${iconBg}`}
                        >
                          {activityIcon}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <p
                            className="text-xs font-semibold text-foreground leading-normal truncate"
                            title={activityLabel}
                          >
                            {activityLabel}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {activityDateStr}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-emerald-600 shrink-0 select-none">
                          +{record.xpEarned} XP
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border rounded-xl bg-card/10 select-none">
                  No recent activities logged yet.
                </div>
              )}
            </Section>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
