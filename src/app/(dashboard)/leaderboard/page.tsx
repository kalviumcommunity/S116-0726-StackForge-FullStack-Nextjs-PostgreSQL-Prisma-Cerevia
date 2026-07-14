import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Flame, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
  const mockLeaderboard = [
    { rank: 1, name: 'Amit Sharma', xp: 2450, streak: 12, current: true },
    { rank: 2, name: 'Priya Patel', xp: 2100, streak: 8 },
    { rank: 3, name: 'Rohan Gupta', xp: 1950, streak: 5 },
    { rank: 4, name: 'Sneha Reddy', xp: 1700, streak: 3 },
    { rank: 5, name: 'Vikram Singh', xp: 1550, streak: 1 },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Weekly Leaderboard"
        description="Compete with other engineers, earn experience multipliers, and secure the top spot."
        actions={
          <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
            <Flame className="h-4 w-4 fill-current" />
            <span>Leaderboard refreshes hourly</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Top 3 podium summary */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Standings</span>
              </CardTitle>
              <CardDescription>
                The rankings compile dynamically based on lesson completions and streak multipliers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {mockLeaderboard.map((student) => (
                  <div
                    key={student.rank}
                    className={`flex items-center justify-between p-4 px-6 transition-colors hover:bg-muted/5 ${
                      student.current ? 'bg-orange-500/5 hover:bg-orange-500/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-muted-foreground w-6">
                        #{student.rank}
                      </span>
                      <Avatar fallback={student.name} size="sm" className="border-border" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-foreground truncate flex items-center gap-2">
                          {student.name}
                          {student.current && (
                            <Badge variant="success" className="text-[10px] px-1.5 py-0">
                              You
                            </Badge>
                          )}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-500 fill-current" />
                          {student.streak} day streak
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-orange-500">
                      {student.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard information card */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-primary" />
                  <span>XP Multipliers</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  Maintain your daily streak to increase your score multiplier for new lessons.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs leading-relaxed">
                <div className="flex justify-between items-center py-1.5 border-b border-border/45">
                  <span className="text-muted-foreground">Base Reward</span>
                  <span className="font-semibold text-foreground">1.0x</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/45">
                  <span className="text-muted-foreground">3-Day Streak</span>
                  <span className="font-semibold text-orange-500">1.1x</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/45">
                  <span className="text-muted-foreground">7-Day Streak</span>
                  <span className="font-semibold text-orange-500">1.25x</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-muted-foreground">14+ Day Streak</span>
                  <span className="font-semibold text-orange-500">1.5x</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
