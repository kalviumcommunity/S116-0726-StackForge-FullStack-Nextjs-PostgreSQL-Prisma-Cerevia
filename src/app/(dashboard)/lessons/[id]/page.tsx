import { getLessonById } from '@/lib/services/lessons';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jwt';
import { LessonDetailClient } from '@/components/lessons/LessonDetailClient';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lesson Detail | Cerevia',
  description: 'Learn and complete lessons to earn XP.',
};

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // 1. Fetch lesson details from database
  let lesson;
  try {
    lesson = await getLessonById(resolvedParams.id);
  } catch (error) {
    return notFound();
  }

  // 2. Determine logged in user from cookies to check progress
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let userId = '';
  
  if (token) {
    try {
      const decoded = verifyAccessToken(token);
      userId = decoded.userId;
    } catch (e) {
      // Invalid token
    }
  }

  // 3. Query LessonProgress database to check if already completed
  let isCompleted = false;
  if (userId) {
    const progress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId: resolvedParams.id,
        },
      },
    });
    isCompleted = !!progress;
  }

  return (
    <LessonDetailClient 
      lesson={{
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
      }}
      initialCompleted={isCompleted}
    />
  );
}
