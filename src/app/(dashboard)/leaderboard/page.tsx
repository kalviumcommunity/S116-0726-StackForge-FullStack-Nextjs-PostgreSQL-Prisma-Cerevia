'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { LeaderboardHero } from '@/components/leaderboard/LeaderboardHero';
import { PodiumSection, PodiumStudent } from '@/components/leaderboard/PodiumSection';
import { GlobalLeaderboardTable, LeaderboardEntryItem } from '@/components/leaderboard/GlobalLeaderboardTable';
import { LeagueSystemCards } from '@/components/leaderboard/LeagueSystemCards';
import { FriendsLeaderboardView } from '@/components/leaderboard/FriendsLeaderboardView';
import { CommunityActivityFeed } from '@/components/leaderboard/CommunityActivityFeed';
import { CommunityChallengesCard } from '@/components/leaderboard/CommunityChallengesCard';
import { MiniProfileModal } from '@/components/leaderboard/MiniProfileModal';
import { Loader2 } from 'lucide-react';
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

interface UserRankResponse {
  rank: number;
  weeklyXP?: number;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(4);

  // Tab & Controls State
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'leagues' | 'activity'>('global');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  const [selectedStudent, setSelectedStudent] = useState<LeaderboardEntryItem | null>(null);

  useEffect(() => {
    async function loadLeaderboardData() {
      try {
        const [boardRes, rankRes] = await Promise.all([
          api.get<LeaderboardResponse>('/api/user/leaderboard?limit=25'),
          api.get<UserRankResponse>('/api/user/leaderboard/rank'),
        ]);

        if (boardRes.success && boardRes.data) {
          setBoard(boardRes.data.leaderboard);
        }
        if (rankRes.success && rankRes.data) {
          setUserRank(rankRes.data.rank || 4);
        }
      } catch (err) {
        console.error('Failed to load weekly leaderboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboardData();
  }, []);

  // Demo Fallback Data for Podium & Global Rankings if DB has few entries
  const defaultEntries: LeaderboardEntryItem[] = [
    {
      userId: 'p1',
      fullName: 'Sarah Chen',
      avatar: '/images/community/avatars/rank1.webp',
      weeklyXP: 850,
      rank: 1,
      streak: 14,
      batch: 'Batch 2026',
    },
    {
      userId: 'p2',
      fullName: 'Alex Rivera',
      avatar: '/images/community/avatars/rank2.webp',
      weeklyXP: 720,
      rank: 2,
      streak: 9,
      batch: 'Batch 2026',
    },
    {
      userId: 'p3',
      fullName: 'David Miller',
      avatar: '/images/community/avatars/rank3.webp',
      weeklyXP: 610,
      rank: 3,
      streak: 7,
      batch: 'Batch 2026',
    },
    {
      userId: user?.id || 'self',
      fullName: user?.fullName || 'Test Student (You)',
      avatar: user?.avatar || '/images/community/avatars/friend1.webp',
      weeklyXP: 450,
      rank: userRank || 4,
      streak: 5,
      batch: 'Batch 2026',
    },
    {
      userId: 'p5',
      fullName: 'Elena Rostova',
      avatar: '/images/community/avatars/friend2.webp',
      weeklyXP: 380,
      rank: 5,
      streak: 4,
      batch: 'Batch 2026',
    },
  ];

  const activeEntries = board.length >= 3 ? board : defaultEntries;

  const topThree: PodiumStudent[] = activeEntries.slice(0, 3).map((e) => ({
    userId: e.userId,
    fullName: e.fullName || 'Student',
    avatar: e.avatar || '/images/community/avatars/rank1.webp',
    weeklyXP: e.weeklyXP,
    rank: e.rank,
    streak: e.streak || 5,
    level: Math.floor((e.weeklyXP || 0) / 100) + 1,
  }));

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full pb-16 px-4 md:px-0">
      
      {/* Leaderboard Hero */}
      <LeaderboardHero
        userRank={userRank}
        userXP={user?.id ? 450 : 0}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* Top 3 Podium Section */}
      <PodiumSection topThree={topThree} />

      {/* Active Tab View */}
      {activeTab === 'global' && (
        <GlobalLeaderboardTable
          entries={activeEntries}
          currentUserId={user?.id}
          searchQuery={searchQuery}
          onSelectStudent={(student) => setSelectedStudent(student)}
        />
      )}

      {activeTab === 'friends' && <FriendsLeaderboardView />}

      {activeTab === 'leagues' && <LeagueSystemCards currentLeague="Gold" />}

      {activeTab === 'activity' && <CommunityActivityFeed />}

      {/* Community Co-Op Challenges */}
      <CommunityChallengesCard />

      {/* Student Profile Preview Modal */}
      <MiniProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

    </div>
  );
}
