'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { LearningPathsRoadmap } from '@/components/lessons/LearningPathsRoadmap';
import {
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Star,
  Users,
  ArrowRight,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import api from '@/services/api';
import { cn } from '@/lib/utils';

interface LessonItem {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  xpReward: number;
  completedAt?: string;
  completed?: boolean;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'roadmaps'>(
    'syllabus',
  );

  useEffect(() => {
    async function loadLessons() {
      try {
        const [lessonsRes, progressRes] = await Promise.all([
          api.get<LessonItem[]>('/api/lessons'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          api.get<any>('/api/lessons/progress'),
        ]);

        if (lessonsRes.success && lessonsRes.data) {
          const rawLessons = lessonsRes.data;
          const completedIds = new Set<string>();

          if (
            progressRes.success &&
            progressRes.data &&
            progressRes.data.completed
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            progressRes.data.completed.forEach((p: any) =>
              completedIds.add(p.lessonId),
            );
          }

          const mapped = rawLessons.map((l) => ({
            ...l,
            completed: completedIds.has(l.id),
          }));

          setLessons(mapped);
        }
      } catch (err) {
        console.error('Failed to load lessons list:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLessons();
  }, []);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.description || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesDiff =
      difficultyFilter === 'ALL' || lesson.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const getCourseThumbnail = (index: number) => {
    const thumbs = [
      '/images/courses/nextjs.webp',
      '/images/courses/typescript.webp',
      '/images/courses/ai-agents.webp',
      '/images/courses/system-design.webp',
      '/images/courses/database.webp',
    ];
    return thumbs[index % thumbs.length];
  };

  const getInstructorAvatar = (index: number) => {
    return index % 2 === 0
      ? '/images/instructors/alex.webp'
      : '/images/instructors/sarah.webp';
  };

  const getInstructorName = (index: number) => {
    return index % 2 === 0
      ? 'Alex Chen • Ex-Vercel'
      : 'Sarah Jenkins • Ex-Apple';
  };

  return (
    <PageContainer>
      <PageHeader
        title="Learning Experience Hub"
        description="Explore structured software engineering modules, career roadmaps, interactive coding sandboxes, and quizzes."
      />

      <ContentWrapper className="space-y-8">
        {/* Navigation Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={cn(
              'flex select-none items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all',
              activeTab === 'syllabus'
                ? 'border-white bg-white text-zinc-950 shadow-lg'
                : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white',
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>Course Syllabus & Modules</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmaps')}
            className={cn(
              'flex select-none items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all',
              activeTab === 'roadmaps'
                ? 'border-white bg-white text-zinc-950 shadow-lg'
                : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white',
            )}
          >
            <Compass className="h-4 w-4" />
            <span>Career Roadmaps</span>
          </button>
        </div>

        {/* Tab 1: Course Syllabus */}
        {activeTab === 'syllabus' && (
          <div className="space-y-8">
            {/* Search and Filter Toolbar */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl sm:flex-row">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search modules, topics, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 font-sans text-xs text-white transition-all placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Difficulty Filters */}
              <div className="scrollbar-none flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
                <SlidersHorizontal className="mr-1 hidden h-4 w-4 shrink-0 text-zinc-500 sm:block" />
                {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={cn(
                      'shrink-0 rounded-xl border px-3.5 py-1.5 text-[11px] font-bold tracking-wider transition-all',
                      difficultyFilter === diff
                        ? 'border-blue-500 bg-blue-600 text-white shadow-md'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white',
                    )}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Grid Content */}
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-64 animate-pulse flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
                  >
                    <div className="space-y-3">
                      <div className="h-4 w-1/3 rounded-xl bg-zinc-900" />
                      <div className="h-6 w-3/4 rounded-xl bg-zinc-900" />
                    </div>
                    <div className="mt-4 h-10 rounded-xl bg-zinc-900" />
                  </div>
                ))}
              </div>
            ) : filteredLessons.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    No Learning Modules Found
                  </h4>
                  <p className="max-w-sm text-xs text-zinc-400">
                    We couldn&apos;t find any modules matching your filter
                    query. Try clearing filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('ALL');
                  }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredLessons.map((lesson, idx) => {
                  const thumb = getCourseThumbnail(idx);
                  const instAvatar = getInstructorAvatar(idx);
                  const instName = getInstructorName(idx);

                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        'group flex flex-col justify-between overflow-hidden rounded-3xl border bg-zinc-950 shadow-xl transition-all duration-300',
                        lesson.completed
                          ? 'border-emerald-500/30 bg-zinc-950/80'
                          : 'border-zinc-800 hover:border-zinc-700',
                      )}
                    >
                      {/* WebP Course Image Banner */}
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                        <Image
                          src={thumb}
                          alt={lesson.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute left-3 top-3 flex items-center gap-2">
                          <span
                            className={cn(
                              'rounded-xl border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md',
                              lesson.completed
                                ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-400'
                                : 'border-zinc-800 bg-zinc-950/80 text-zinc-300',
                            )}
                          >
                            {lesson.completed ? 'Completed' : lesson.difficulty}
                          </span>
                        </div>

                        <span className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-extrabold text-amber-400">
                          <Sparkles className="h-3.5 w-3.5" /> +
                          {lesson.xpReward} XP
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                        <div className="space-y-2">
                          <h3 className="line-clamp-1 text-lg font-extrabold text-white transition-colors group-hover:text-blue-400">
                            {lesson.title}
                          </h3>
                          <p className="line-clamp-2 text-xs font-normal leading-relaxed text-zinc-400">
                            {lesson.description ||
                              'Master key principles and complete interactive coding challenges.'}
                          </p>
                        </div>

                        {/* Instructor & Rating Row */}
                        <div className="space-y-3 border-t border-zinc-800/80 pt-3">
                          <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                            <div className="flex items-center gap-2">
                              <Image
                                src={instAvatar}
                                alt="Instructor"
                                width={24}
                                height={24}
                                unoptimized
                                className="h-6 w-6 rounded-full border border-zinc-800 object-cover"
                              />
                              <span className="text-[11px] font-semibold text-zinc-300">
                                {instName}
                              </span>
                            </div>

                            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                              <Star className="h-3.5 w-3.5 fill-amber-400" />{' '}
                              4.9
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-zinc-500" />{' '}
                              ~20 Mins
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-zinc-500" />{' '}
                              1,420 Students
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Action */}
                      <div className="p-6 pt-0">
                        {lesson.completed ? (
                          <Link
                            href={`/lessons/${lesson.id}`}
                            className="block w-full"
                          >
                            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-800">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span>Review Completed Lesson</span>
                            </button>
                          </Link>
                        ) : (
                          <Link
                            href={`/lessons/${lesson.id}`}
                            className="block w-full"
                          >
                            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 shadow-md transition-all hover:bg-zinc-100 group-hover:translate-x-0.5">
                              <span>Start Interactive Module</span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Learning Paths Roadmaps */}
        {activeTab === 'roadmaps' && <LearningPathsRoadmap />}
      </ContentWrapper>
    </PageContainer>
  );
}
