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
