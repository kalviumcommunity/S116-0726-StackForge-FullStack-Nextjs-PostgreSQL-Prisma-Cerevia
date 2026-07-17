'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/providers/AuthProvider';
import { Trophy, Flame, Sparkles } from 'lucide-react';
import api from '@/services/api';

interface LeaderboardEntry {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
  streak?: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination: {
    limit: number;
    skip: number;
    totalCount: number;
  };
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await api.get<LeaderboardResponse>('/api/user/leaderboard?limit=25');
        if (res.success && res.data) {
          setBoard(res.data.leaderboard);
        }
      } catch (err) {
        console.error('Failed to load weekly leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Weekly Leaderboard"
        description="Compete with other engineers, earn experience multipliers, and secure the top spot."
        actions={
          <div className="flex items-center gap-1.5 text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-none select-none">
            <Flame className="h-3.5 w-3.5 fill-primary text-primary animate-pulse" />
            <span>Refreshes dynamically</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main leaderboard standings */}
          <Card className="md:col-span-2 rounded-none border border-border/10 bg-[#090909]">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 text-white font-bold tracking-tight">
                <Trophy className="h-4.5 w-4.5 text-primary" />
                <span>Global Standings</span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-1.5 font-normal">
                The rankings compile dynamically based on lesson completions and weekly XP logs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 border-t border-border/10">
              {loading ? (
                <div className="divide-y divide-border/10">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 px-6 animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-6 bg-gray-800 rounded-none" />
                        <div className="h-8 w-8 bg-gray-800 rounded-none" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-28 bg-gray-800 rounded-none" />
                          <div className="h-3 w-16 bg-gray-800 rounded-none" />
                        </div>
                      </div>
                      <div className="h-4 w-12 bg-gray-800 rounded-none" />
                    </div>
                  ))}
                </div>
              ) : board.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs font-light font-sans uppercase tracking-wider">
                  No weekly leaderboard entries found yet. Start a lesson to join the board!
                </div>
              ) : (
                <div className="divide-y divide-border/10">
                  {board.map((entry) => {
                    const isSelf = entry.userId === user?.id;
                    return (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-4 px-6 transition-all hover:bg-primary/[0.01] ${
                          isSelf ? 'bg-primary/[0.03] border-y border-primary/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-serif font-light w-6 ${
                            entry.rank === 1 ? 'text-primary' :
                            entry.rank === 2 ? 'text-white/80' :
                            entry.rank === 3 ? 'text-white/60' : 'text-muted-foreground/45'
                          }`}>
                            #{entry.rank}
                          </span>
                          <Avatar fallback={entry.fullName || 'Student'} size="sm" className="border border-primary/20 shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-sans uppercase tracking-wide font-medium text-white truncate flex items-center gap-2">
                              {entry.fullName || 'Student'}
                              {isSelf && (
                                <Badge variant="success" className="select-none">
                                  You
                                </Badge>
                              )}
                            </span>
                            <span className="text-[9px] font-sans text-muted-foreground/60 flex items-center gap-1 font-light uppercase tracking-wider">
                              Syllabus Level {Math.floor((entry.weeklyXP || 0) / 100) + 1}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-sans font-medium tracking-wide text-primary">
                          {entry.weeklyXP} XP
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leaderboard stats / rules panel */}
          <div className="space-y-6">
            <Card className="bg-[#090909] border border-border/10 rounded-none p-8">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-base flex items-center gap-2 text-white font-bold tracking-tight">
                  <Sparkles className="h-4.5 w-4.5 text-primary" />
                  <span>Streak Multipliers</span>
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground/80 mt-1">
                  Maintain your daily streak to increase your score multiplier for new lessons.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3.5 text-[11px] leading-relaxed font-sans uppercase tracking-wider font-light text-muted-foreground/80">
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-muted-foreground/60 font-light">Base Multiplier</span>
                  <span className="text-white font-medium">1.0x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-muted-foreground/60 font-light">3-Day Streak Boost</span>
                  <span className="text-primary font-medium">1.1x XP</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-muted-foreground/60 font-light">7-Day Streak Boost</span>
                  <span className="text-primary font-medium">1.25x XP</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground/60 font-light">14+ Day Streak Boost</span>
                  <span className="text-primary font-medium">1.5x XP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
