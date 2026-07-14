export const API_ROUTES = {
  HEALTH: '/api/health',
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  LESSONS: {
    LIST: '/api/lessons',
    GET: (id: string) => `/api/lessons/${id}`,
    COMPLETE: (id: string) => `/api/lessons/${id}/complete`,
    PROGRESS: '/api/lessons/progress',
  },
  STREAK: {
    STATUS: '/api/streak',
  },
  LEADERBOARD: {
    GLOBAL: '/api/user/leaderboard',
    RANK: '/api/user/leaderboard/rank',
  },
  PROFILE: {
    GET: '/api/user/profile',
    UPDATE: '/api/user/profile',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  LESSONS: '/lessons',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
};

export const STREAK_RULES = {
  RESET_HOURS: 24,
  XP_MULTIPLIERS: {
    BASE: 1.0,
    TIER_1: 1.1, // 3 days
    TIER_2: 1.25, // 7 days
    TIER_3: 1.5, // 14+ days
  },
};
