export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  xp: number;
  currentStreak: number;
  highestStreak: number;
  lastActiveAt?: string;
  avatarUrl?: string;
  user: {
    name?: string;
    email: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  order: number;
  createdAt: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: string;
  scoreMultiplier: number;
  answers: Record<string, unknown>;
  lesson: Lesson;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  rank: number;
  currentStreak: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface StreakInfo {
  currentStreak: number;
  lastActivityAt: string | null;
  status: 'active' | 'at_risk' | 'inactive';
}

export interface UserRankInfo {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
  totalParticipants: number;
}

export interface LevelInfo {
  level: number;
  xpInCurrentLevel: number;
  xpRemaining: number;
  xpNeededForNextLevel: number;
  progressPercentage: number;
}

export interface XPHistoryItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
  lesson: {
    id: string;
    title: string;
    difficulty: string;
  } | null;
}

export interface UserXpResponse {
  currentXP: number;
  totalXP: number;
  levelInfo: LevelInfo;
  history: XPHistoryItem[];
  pagination: {
    limit: number;
    skip: number;
    totalCount: number;
  };
}

export interface UserProgressResponse {
  completedLessons: {
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
    completedAt: string;
  }[];
  totalCompleted: number;
  remainingLessons: {
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
  }[];
}

export interface UserProfileInfo {
  id: string;
  email: string;
  fullName: string | null;
  avatar: string | null;
  bio: string | null;
  totalXP: number;
  currentXP: number;
  currentStreak: number;
  maxStreak: number;
  createdAt: string;
  updatedAt: string;
}


