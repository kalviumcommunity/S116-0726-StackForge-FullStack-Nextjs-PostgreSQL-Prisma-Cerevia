'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { VideoPlayer } from './VideoPlayer';
import { LessonContent } from './LessonContent';
import { QuizComponent } from './QuizComponent';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2, Trophy, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';

interface LessonDetailClientProps {
  lesson: {
    id: string;
    title: string;
    description: string | null;
    xpReward: number;
    difficulty: string;
  };
  initialCompleted: boolean;
}

export function LessonDetailClient({ lesson, initialCompleted }: LessonDetailClientProps) {
  const router = useRouter();
  const { refreshUser } = useAuth();
  
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Quiz completion tracking
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  // Video watching tracking
  const [videoWatched, setVideoWatched] = useState(false);

  const handleQuizComplete = (correct: boolean) => {
    setQuizCompleted(true);
    setQuizCorrect(correct);
  };

  const handleCompleteLesson = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await api.post<any>(`/api/lessons/${lesson.id}/complete`);
      if (response.success) {
        setIsCompleted(true);
        // Refresh the user context to sync new XP and streak values
        await refreshUser();
        // Redirect back to lessons list
        router.push('/lessons');
      } else {
        setError(response.error?.message || 'Failed to mark lesson as completed.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock content and video details mapping to database entries
  const contentMap: Record<string, { videoUrl: string; body: string; quiz: { question: string; options: string[]; correctIdx: number } }> = {
    'e6a8d672-1d54-4f05-87d4-fdf6ee25690b': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and layout of web content using a variety of tags and attributes. Key elements include block-level tags like `<div>`, `<header>`, and `<section>`, and inline tags like `<span>`, `<a>`, and `<strong>`. Understanding semantic HTML is crucial for SEO, accessibility, and modern application layout structures.',
      quiz: {
        question: 'Which HTML element is used to define semantic article contents?',
        options: ['<div>', '<article>', '<section-art>', '<page-body>'],
        correctIdx: 1,
      }
    },
    'f7b9e783-2e65-4f16-98e5-0ef7ff36701c': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML. This lesson explores the box model (margin, border, padding, and content), Flexbox, CSS Grid layouts, and custom theme tokens. We cover cascading order, inheritance, and visual responsiveness patterns to create gorgeous user interfaces.',
      quiz: {
        question: 'Which box model property controls the space between the border and the inner content?',
        options: ['Margin', 'Padding', 'Outline', 'Spacing'],
        correctIdx: 1,
      }
    },
    'a8c0f894-3f76-5f27-a9f6-1f880047812d': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'JavaScript is a high-level, single-threaded, compiled or interpreted programming language that conforms to the ECMAScript specification. In this lesson, we cover block scoping (`let`, `const`), closures, prototypal inheritance, array helper methods, promise states, and the asynchronous event loop runtime model.',
      quiz: {
        question: 'Which keyword defines a block-scoped local variable in JavaScript?',
        options: ['var', 'let', 'global', 'define'],
        correctIdx: 1,
      }
    },
    'b9d1a905-4087-6f38-b0a7-2f991158923e': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'Next.js App Router introduced a file-system based router built on React Server Components. It supports layouts, nested routing, loading states, error boundaries, and server actions out-of-the-box. We dive deep into pre-rendering, static site generation (SSG), incremental static regeneration (ISR), and dynamic server-side rendering (SSR).',
      quiz: {
        question: 'Are React components in the Next.js App Router Server Components by default?',
        options: ['No, they are Client Components', 'Yes, they are Server Components', 'Only if they contain async/await', 'Only in production builds'],
        correctIdx: 1,
      }
    },
    'c0e2b016-5198-7f49-c1b8-3fa02269034f': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'Prisma is a next-generation Node.js and TypeScript ORM. It replaces traditional ORMs with an intuitive database schema definition language, auto-generated type-safe client libraries, and a robust migrations engine. We cover relational joins, transaction nesting, query optimization, and how to query PostgreSQL effectively.',
      quiz: {
        question: 'Which file is used to define model schemas and data sources in Prisma?',
        options: ['prisma.config.js', 'schema.prisma', 'database.json', 'models.ts'],
        correctIdx: 1,
      }
    }
  };

  const currentDetails = contentMap[lesson.id] || {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    body: lesson.description || 'Welcome to this lesson! Please review the content and complete the quiz.',
    quiz: {
      question: 'Which of the following is true about this backend module?',
      options: ['It uses standard scale-out patterns.', 'It is completely client-side.', 'It doesn\'t connect to database.', 'It doesn\'t support caching.'],
      correctIdx: 0,
    }
  };

  const quizOptions = currentDetails.quiz.options.map((text, idx) => ({
    id: String(idx),
    text
  }));

  const canComplete = isCompleted || (videoWatched && quizCompleted && quizCorrect);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10 px-4 md:px-0 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/lessons" className="inline-flex items-center text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-muted-foreground/60 hover:text-primary transition-colors duration-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex items-center text-[10px] font-sans uppercase tracking-[0.15em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-none border border-primary/20">
            <Trophy className="mr-1.5 h-3.5 w-3.5 text-primary" />
            +{lesson.xpReward} XP Reward
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main content columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-none overflow-hidden border border-border/10 shadow-none bg-black relative group">
            <VideoPlayer 
              url={currentDetails.videoUrl} 
              title={lesson.title} 
              onPlay={() => setVideoWatched(true)}
            />
          </div>
          
          <div className="space-y-4 bg-[#090909] p-8 rounded-none border border-border/10">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-medium tracking-[0.15em] text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-none border border-primary/20">
                {lesson.difficulty}
              </span>
              <span className="text-[10px] text-muted-foreground/40 font-sans tracking-wider uppercase">
                ID: {lesson.id.substring(0, 8)}...
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-wide text-white leading-tight">
              {lesson.title}
            </h1>
            <p className="text-muted-foreground/80 text-sm leading-relaxed font-sans font-light">
              {currentDetails.body}
            </p>
          </div>

          <div className="border-t border-border/10 pt-6">
            <LessonContent content={`## Core Module Outline\n- Review course prerequisites and learning objectives.\n- Implement design tokens and visual indicators for backend features.\n- Learn best practices in scaling relational database architectures.\n- Complete quiz questionnaire below to test your topic knowledge.`} />
          </div>

          {!isCompleted && (
            <div className="border-t border-border/10 pt-6 mt-8">
              <QuizComponent 
                question={currentDetails.quiz.question}
                options={quizOptions}
                correctOptionId={String(currentDetails.quiz.correctIdx)}
                onComplete={handleQuizComplete}
              />
            </div>
          )}
        </div>

        {/* Right side progress status */}
        <div className="space-y-6">
          <div className="rounded-none border border-border/10 bg-[#090909] p-8 shadow-none sticky top-24">
            <h3 className="font-serif font-medium text-base text-white mb-6 tracking-wide">Lesson Milestone Progress</h3>
            
            <div className="space-y-5 mb-6">
              <div className="flex items-start gap-3">
                {videoWatched || isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 rounded-none border border-border/30 shrink-0 mt-0.5 transition-all" />
                )}
                <div>
                  <p className="text-xs font-sans uppercase tracking-wider font-medium text-white">Watch Course Video</p>
                  <p className="text-[11px] font-sans font-light text-muted-foreground/60">Play the short tutorial video to completion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {quizCompleted && quizCorrect || isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 rounded-none border border-border/30 shrink-0 mt-0.5 transition-all" />
                )}
                <div>
                  <p className="text-xs font-sans uppercase tracking-wider font-medium text-white">Pass Concept Quiz</p>
                  <p className="text-[11px] font-sans font-light text-muted-foreground/60">Select the correct answer to master the topic.</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/50 border border-red-500/20 text-red-400 text-xs rounded-none mb-4 font-medium">
                {error}
              </div>
            )}

            {isCompleted ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 p-3.5 bg-primary/10 border border-primary/20 rounded-none text-primary text-[10px] font-sans uppercase tracking-[0.15em] select-none">
                  <CheckCircle2 className="h-4 w-4 text-primary animate-pulse" />
                  <span>Module Completed & Saved</span>
                </div>
                <Link href="/lessons" className="w-full">
                  <Button variant="outline" className="w-full text-[10px] font-sans uppercase tracking-[0.18em] border-border/10 text-white hover:bg-primary/[0.02] py-3.5 duration-300 rounded-none">
                    Back to Lessons
                  </Button>
                </Link>
              </div>
            ) : (
              <Button 
                onClick={handleCompleteLesson} 
                disabled={!canComplete || isSubmitting}
                className={`w-full font-sans uppercase tracking-[0.18em] text-[10px] py-3.5 select-none flex items-center justify-center gap-2 border-none rounded-none ${
                  canComplete 
                    ? 'bg-primary text-black hover:bg-primary/95 duration-300' 
                    : 'bg-border/5 text-muted-foreground/30 cursor-not-allowed shadow-none'
                }`}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Saving progress...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Claim Reward</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
