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
  Award,
  ArrowRight,
  SlidersHorizontal,
  Compass,
  Layers,
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
  const [activeTab, setActiveTab] = useState<'syllabus' | 'roadmaps'>('syllabus');

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

          if (progressRes.success && progressRes.data && progressRes.data.completed) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            progressRes.data.completed.forEach((p: any) => completedIds.add(p.lessonId));
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
      (lesson.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'ALL' || lesson.difficulty === difficultyFilter;
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
    return index % 2 === 0 ? '/images/instructors/alex.webp' : '/images/instructors/sarah.webp';
  };

  const getInstructorName = (index: number) => {
    return index % 2 === 0 ? 'Alex Chen • Ex-Vercel' : 'Sarah Jenkins • Ex-Apple';
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
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border select-none',
              activeTab === 'syllabus'
                ? 'bg-white text-zinc-950 border-white shadow-lg'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>Course Syllabus & Modules</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmaps')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border select-none',
              activeTab === 'roadmaps'
                ? 'bg-white text-zinc-950 border-white shadow-lg'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
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
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-950 p-5 rounded-2xl border border-zinc-800 shadow-xl">
              
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search modules, topics, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                />
              </div>

              {/* Difficulty Filters */}
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <SlidersHorizontal className="h-4 w-4 text-zinc-500 shrink-0 mr-1 hidden sm:block" />
                {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-[11px] font-bold tracking-wider transition-all border shrink-0',
                      difficultyFilter === diff
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white'
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
                    className="animate-pulse bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-64 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="h-4 bg-zinc-900 rounded-xl w-1/3" />
                      <div className="h-6 bg-zinc-900 rounded-xl w-3/4" />
                    </div>
                    <div className="h-10 bg-zinc-900 rounded-xl mt-4" />
                  </div>
                ))}
              </div>
            ) : filteredLessons.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-3xl p-16 text-center bg-zinc-950 min-h-[320px] space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">No Learning Modules Found</h4>
                  <p className="text-xs text-zinc-400 max-w-sm">
                    We couldn&apos;t find any modules matching your filter query. Try clearing filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('ALL');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
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
                        'rounded-3xl border bg-zinc-950 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group',
                        lesson.completed
                          ? 'border-emerald-500/30 bg-zinc-950/80'
                          : 'border-zinc-800 hover:border-zinc-700'
                      )}
                    >
                      {/* WebP Course Image Banner */}
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                        <Image
                          src={thumb}
                          alt={lesson.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span
                            className={cn(
                              'rounded-xl border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md',
                              lesson.completed
                                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                                : 'bg-zinc-950/80 border-zinc-800 text-zinc-300'
                            )}
                          >
                            {lesson.completed ? 'Completed' : lesson.difficulty}
                          </span>
                        </div>

                        <span className="absolute bottom-3 left-3 text-xs font-extrabold text-amber-400 flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" /> +{lesson.xpReward} XP
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        
                        <div className="space-y-2">
                          <h3 className="text-lg font-extrabold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-normal">
                            {lesson.description || 'Master key principles and complete interactive coding challenges.'}
                          </p>
                        </div>

                        {/* Instructor & Rating Row */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                          
                          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                            <div className="flex items-center gap-2">
                              <Image
                                src={instAvatar}
                                alt="Instructor"
                                width={24}
                                height={24}
                                unoptimized
                                className="h-6 w-6 rounded-full object-cover border border-zinc-800"
                              />
                              <span className="text-[11px] text-zinc-300 font-semibold">{instName}</span>
                            </div>

                            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                              <Star className="h-3.5 w-3.5 fill-amber-400" /> 4.9
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-zinc-500" /> ~20 Mins
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-zinc-500" /> 1,420 Students
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* Card Footer Action */}
                      <div className="p-6 pt-0">
                        {lesson.completed ? (
                          <Link href={`/lessons/${lesson.id}`} className="block w-full">
                            <button className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 hover:bg-zinc-800 transition-all">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span>Review Completed Lesson</span>
                            </button>
                          </Link>
                        ) : (
                          <Link href={`/lessons/${lesson.id}`} className="block w-full">
                            <button className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-all shadow-md group-hover:translate-x-0.5">
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
