import { api } from './api';
import {
  UserProfileInfo,
  UserXpResponse,
  StreakInfo,
  UserRankInfo,
  UserProgressResponse,
  ApiResponse,
} from '@/types';

export const dashboardService = {
  /**
   * Fetches the user profile details.
   */
  async fetchUserProfile(): Promise<ApiResponse<UserProfileInfo>> {
    return api.get<UserProfileInfo>('/api/user/profile');
  },

  /**
   * Fetches the user XP metrics, level information, and recent XP history.
   */
  async fetchXpDetails(limit: number = 5): Promise<ApiResponse<UserXpResponse>> {
    return api.get<UserXpResponse>(`/api/user/xp?limit=${limit}`);
  },

  /**
   * Fetches the user streak information and status.
   */
  async fetchStreakDetails(): Promise<ApiResponse<StreakInfo>> {
    return api.get<StreakInfo>('/api/user/streak');
  },

  /**
   * Fetches the user weekly leaderboard rank and participation summary.
   */
  async fetchUserLeaderboardRank(): Promise<ApiResponse<UserRankInfo>> {
    return api.get<UserRankInfo>('/api/user/leaderboard/rank');
  },

  /**
   * Fetches the user lesson progress stats, including completed and remaining lessons.
   */
  async fetchLessonsProgress(): Promise<ApiResponse<UserProgressResponse>> {
    return api.get<UserProgressResponse>('/api/lessons/progress');
  },
};
