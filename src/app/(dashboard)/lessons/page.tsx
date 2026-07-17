'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Sparkles, Trophy, Search } from 'lucide-react';
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

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  useEffect(() => {
    async function loadLessons() {
      try {
        const [lessonsRes, progressRes] = await Promise.all([
          api.get<LessonItem[]>('/api/lessons'),
          api.get<any>('/api/lessons/progress'),
        ]);

        if (lessonsRes.success && lessonsRes.data) {
          const rawLessons = lessonsRes.data;
          const completedIds = new Set<string>();

          if (progressRes.success && progressRes.data && progressRes.data.completed) {
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
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'ALL' || lesson.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <PageContainer>
      <PageHeader 
        title="Curriculum Modules"
        description="Choose a structured lesson to practice backend engineering concepts, complete assignments, and earn XP."
      />

      <ContentWrapper className="space-y-8">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#090909] p-6 rounded-none border border-border/10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
            <input 
              type="text" 
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black border border-border/10 rounded-none text-xs text-white placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all font-sans font-light uppercase tracking-wider"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
              <button 
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-4 py-2 rounded-none text-[10px] font-sans font-medium uppercase tracking-[0.15em] transition-all border shrink-0 ${
                  difficultyFilter === diff 
                    ? 'bg-primary text-black border-transparent' 
                    : 'bg-transparent text-muted-foreground/60 border-border/10 hover:text-white hover:bg-primary/[0.02]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#090909] border border-border/10 rounded-none p-6 h-48 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded-none w-1/3" />
                  <div className="h-5 bg-gray-800 rounded-none w-3/4" />
                </div>
                <div className="space-y-2 mt-2">
                  <div className="h-3 w-full bg-gray-800 rounded-none" />
                  <div className="h-3 w-5/6 bg-gray-800 rounded-none" />
                </div>
                <div className="h-10 bg-gray-800 rounded-none mt-4" />
              </div>
            ))}
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-border/10 rounded-none p-16 text-center bg-[#090909] min-h-[300px]">
            <BookOpen className="h-10 w-10 text-primary/40 mb-4" />
            <h4 className="text-xs font-sans uppercase tracking-widest font-medium text-white mb-1">No Modules Found</h4>
            <p className="text-[11px] font-sans font-light text-muted-foreground/60 max-w-sm leading-relaxed">
              We could not find any lessons matching your filters. Try a different query.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`rounded-none border border-border/10 bg-[#090909] hover:bg-primary/[0.01] transition-all flex flex-col justify-between overflow-hidden shadow-none ${
                  lesson.completed ? 'opacity-80 border-primary/20 bg-black/40' : 'hover:border-primary/30'
                }`}
              >
                <CardHeader className="pb-4 p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={lesson.completed ? 'success' : 'secondary'}>
                      {lesson.completed ? 'Completed' : lesson.difficulty}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground/40 font-sans tracking-widest uppercase">
                      ID: {lesson.id.substring(0, 8)}
                    </span>
                  </div>
                  <CardTitle className="text-base text-white font-serif font-medium tracking-wide line-clamp-1">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5 text-xs text-muted-foreground/80 leading-relaxed font-sans font-light">
                    {lesson.description || 'No module description provided.'}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col mt-auto">
                  <CardContent className="py-4 flex items-center justify-between text-[10px] border-y border-border/10 bg-black/30 font-sans uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-primary/70" />
                      <span className="text-muted-foreground/75 font-light">Core Syllabus</span>
                    </div>
                    <span className="font-medium text-primary">+{lesson.xpReward} XP</span>
                  </CardContent>
                  <CardFooter className="pt-6 justify-between bg-[#090909] p-6">
                    {lesson.completed ? (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full border-border/10 hover:border-primary/30 text-muted-foreground hover:text-white hover:bg-transparent duration-300 font-sans text-[10px] tracking-[0.15em] uppercase">
                          Review Completed Lesson
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="primary" size="sm" className="w-full group text-[10px] tracking-[0.18em] uppercase font-sans flex items-center justify-center gap-1.5 bg-primary text-black hover:bg-primary/90 duration-300 border-none">
                          <span>Start Lesson</span>
                          <Sparkles className="h-3 w-3 text-black" />
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
