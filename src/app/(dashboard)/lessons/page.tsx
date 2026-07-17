'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Sparkles, Trophy, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';

interface LessonItem {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  xpReward: number;
  completedAt?: string;
  completed?: boolean;
}

interface ProgressResponse {
  completedLessons: LessonItem[];
  totalCompleted: number;
  remainingLessons: LessonItem[];
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');

  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await api.get<ProgressResponse>('/api/lessons/progress');
        if (response.success && response.data) {
          const completed = response.data.completedLessons.map(l => ({ ...l, completed: true }));
          const remaining = response.data.remainingLessons.map(l => ({ ...l, completed: false }));
          setLessons([...completed, ...remaining]);
        }
      } catch (error) {
        console.error('Failed to load lessons progress:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProgress();
  }, []);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (lesson.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'ALL' || lesson.difficulty.toUpperCase() === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <PageContainer>
      <PageHeader
        title="Lessons & Syllabus"
        description="Expand your backend engineering knowledge and maintain your learning streak."
        actions={
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1.5 rounded-full select-none">
            <Trophy className="h-4 w-4 text-cyan-400" />
            <span>Leaderboard Multipliers Active</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-950/50 p-4 rounded-2xl border border-gray-900 backdrop-blur-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search syllabus modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800/80 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  difficultyFilter === level
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                    : 'bg-transparent border-gray-800/60 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid or Loading Skeleton */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 flex flex-col gap-4 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-gray-800 rounded-full" />
                  <div className="h-4 w-12 bg-gray-800 rounded" />
                </div>
                <div className="h-6 w-3/4 bg-gray-800 rounded mt-2" />
                <div className="space-y-2 mt-2">
                  <div className="h-3 w-full bg-gray-800 rounded" />
                  <div className="h-3 w-5/6 bg-gray-800 rounded" />
                </div>
                <div className="h-10 bg-gray-800 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-2xl p-12 text-center bg-gray-950/20 min-h-[300px]">
            <BookOpen className="h-10 w-10 text-gray-600 mb-4 animate-bounce" />
            <h4 className="text-sm font-semibold text-white mb-1">No Modules Found</h4>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              We couldn't find any lessons matching your filters. Try a different query.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`rounded-2xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/80 transition-all flex flex-col justify-between overflow-hidden shadow-lg ${
                  lesson.completed ? 'opacity-70 border-emerald-500/10' : 'hover:border-cyan-500/20 hover:shadow-cyan-500/5'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={lesson.completed ? 'success' : 'secondary'}>
                      {lesson.completed ? 'Completed' : lesson.difficulty}
                    </Badge>
                    <span className="text-[10px] text-gray-500 font-mono">
                      ID: {lesson.id.substring(0, 8)}
                    </span>
                  </div>
                  <CardTitle className="text-base text-white font-bold tracking-tight line-clamp-1">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5 text-xs text-gray-400 leading-relaxed font-normal">
                    {lesson.description || 'No module description provided.'}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col mt-auto">
                  <CardContent className="py-3 flex items-center justify-between text-xs border-y border-gray-900/60 bg-gray-900/20">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-gray-400 font-medium">Core Syllabus</span>
                    </div>
                    <span className="font-bold text-cyan-400">+{lesson.xpReward} XP</span>
                  </CardContent>
                  <CardFooter className="pt-4 justify-between bg-gray-950/10 p-6">
                    {lesson.completed ? (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full text-xs font-bold border-gray-800 text-gray-400 hover:text-white">
                          Review Completed Lesson
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="primary" size="sm" className="w-full group text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-md shadow-cyan-500/10">
                          <span>Start Lesson</span>
                          <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
