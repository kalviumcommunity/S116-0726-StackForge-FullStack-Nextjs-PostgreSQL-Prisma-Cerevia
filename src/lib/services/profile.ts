import { prisma } from '@/lib/prisma';
import { UpdateProfileInput } from '@/lib/validation/profile';

export interface UserProfileResponse {
  id: string;
  email: string;
  fullName: string | null;
  avatar: string | null;
  bio: string | null;
  totalXP: number;
  currentXP: number;
  currentStreak: number;
  maxStreak: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Retrieves the profile of a user by their unique ID.
 * Throws an error if the user is not found.
 */
export async function getUserProfile(
  userId: string,
): Promise<UserProfileResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      bio: true,
      totalXP: true,
      currentXP: true,
      currentStreak: true,
      maxStreak: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Updates user profile details (fullName, avatar, bio).
 * Throws an error if the user does not exist.
 */
export async function updateUserProfile(
  userId: string,
  data: UpdateProfileInput,
): Promise<UserProfileResponse> {
  // Check if user exists
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!existing) {
    throw new Error('User not found');
  }

  // Update details
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName: data.fullName !== undefined ? data.fullName : undefined,
      // The schema permits an empty string as a "clear this field" sentinel.
      // Treat it as null so we don't persist a meaningless '' in the database.
      avatar: data.avatar !== undefined ? data.avatar || null : undefined,
      bio: data.bio !== undefined ? data.bio || null : undefined,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      bio: true,
      totalXP: true,
      currentXP: true,
      currentStreak: true,
      maxStreak: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
}
