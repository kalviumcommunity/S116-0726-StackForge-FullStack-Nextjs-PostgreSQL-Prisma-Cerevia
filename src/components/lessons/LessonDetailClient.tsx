'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { VideoPlayer } from './VideoPlayer';
import { LessonContent } from './LessonContent';
import { QuizComponent } from './QuizComponent';
import { PracticeLab } from './PracticeLab';
import { ResourcesDrawer } from './ResourcesDrawer';
import { CertificatePreview } from './CertificatePreview';
import {
  ArrowLeft,
  CheckCircle2,
  Trophy,
  Loader2,
  Play,
  Code2,
  Layers,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';
import { cn } from '@/lib/utils';

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

export function LessonDetailClient({
  lesson,
  initialCompleted,
}: LessonDetailClientProps) {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'notes' | 'practice' | 'resources' | 'certificate'
  >('notes');

  // Tracking State
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
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
      const response = await api.post<any>(
        `/api/lessons/${lesson.id}/complete`,
      );
      if (response.success) {
        setIsCompleted(true);
        await refreshUser();
        router.push('/lessons');
      } else {
        setError(
          response.error?.message || 'Failed to mark lesson as completed.',
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contentMap: Record<
    string,
    {
      videoUrl: string;
      body: string;
      quiz: { question: string; options: string[]; correctIdx: number };
    }
  > = {
    'e6a8d672-1d54-4f05-87d4-fdf6ee25690b': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and layout of web content using a variety of tags and attributes. Key elements include block-level tags like `<div>`, `<header>`, and `<section>`, and inline tags like `<span>`, `<a>`, and `<strong>`. Understanding semantic HTML is crucial for SEO, accessibility, and modern application layout structures.',
      quiz: {
        question:
          'Which HTML element is used to define semantic article contents?',
        options: ['<div>', '<article>', '<section-art>', '<page-body>'],
        correctIdx: 1,
      },
    },
    'f7b9e783-2e65-4f16-98e5-0ef7ff36701c': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML. This lesson explores the box model (margin, border, padding, and content), Flexbox, CSS Grid layouts, and custom theme tokens. We cover cascading order, inheritance, and visual responsiveness patterns to create gorgeous user interfaces.',
      quiz: {
        question:
          'Which box model property controls the space between the border and the inner content?',
        options: ['Margin', 'Padding', 'Outline', 'Spacing'],
        correctIdx: 1,
      },
    },
    'a8c0f894-3f76-5f27-a9f6-1f880047812d': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'JavaScript is a high-level, single-threaded, compiled or interpreted programming language that conforms to the ECMAScript specification. In this lesson, we cover block scoping (`let`, `const`), closures, prototypal inheritance, array helper methods, promise states, and the asynchronous event loop runtime model.',
      quiz: {
        question:
          'Which keyword defines a block-scoped local variable in JavaScript?',
        options: ['var', 'let', 'global', 'define'],
        correctIdx: 1,
      },
    },
    'b9d1a905-4087-6f38-b0a7-2f991158923e': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'Next.js App Router introduced a file-system based router built on React Server Components. It supports layouts, nested routing, loading states, error boundaries, and server actions out-of-the-box. We dive deep into pre-rendering, static site generation (SSG), incremental static regeneration (ISR), and dynamic server-side rendering (SSR).',
      quiz: {
        question:
          'Are React components in the Next.js App Router Server Components by default?',
        options: [
          'No, they are Client Components',
          'Yes, they are Server Components',
          'Only if they contain async/await',
          'Only in production builds',
        ],
        correctIdx: 1,
      },
    },
    'c0e2b016-5198-7f49-c1b8-3fa02269034f': {
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      body: 'Prisma is a next-generation Node.js and TypeScript ORM. It replaces traditional ORMs with an intuitive database schema definition language, auto-generated type-safe client libraries, and a robust migrations engine. We cover relational joins, transaction nesting, query optimization, and how to query PostgreSQL effectively.',
      quiz: {
        question:
          'Which file is used to define model schemas and data sources in Prisma?',
        options: [
          'prisma.config.js',
          'schema.prisma',
          'database.json',
          'models.ts',
        ],
        correctIdx: 1,
      },
    },
  };

  const currentDetails = contentMap[lesson.id] || {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    body:
      lesson.description ||
      'Welcome to this lesson! Please review the content and complete the quiz.',
    quiz: {
      question: 'Which of the following is true about this backend module?',
      options: [
        'It uses standard scale-out patterns.',
        'It is completely client-side.',
        "It doesn't connect to database.",
        "It doesn't support caching.",
      ],
      correctIdx: 0,
    },
  };

  const quizOptions = currentDetails.quiz.options.map((text, idx) => ({
    id: String(idx),
    text,
  }));

  const canComplete =
    isCompleted || (videoWatched && quizCompleted && quizCorrect);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 md:px-0">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Syllabus</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
            <Trophy className="h-3.5 w-3.5 fill-amber-400" />+{lesson.xpReward}{' '}
            XP Reward
          </span>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Main Player & Content Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video Player */}
          <VideoPlayer
            url={currentDetails.videoUrl}
            title={lesson.title}
            onPlay={() => setVideoWatched(true)}
          />

          {/* Lesson Metadata Header */}
          <div className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                {lesson.difficulty}
              </span>
              <span className="font-mono text-[10px] text-zinc-500">
                ID: {lesson.id.substring(0, 8)}...
              </span>
            </div>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
              {lesson.title}
            </h1>
            <p className="text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm">
              {currentDetails.body}
            </p>
          </div>

          {/* Interactive Workspace Tab Switcher */}
          <div className="scrollbar-none flex items-center gap-2 overflow-x-auto border-b border-zinc-800 pb-3">
            <button
              onClick={() => setActiveTab('notes')}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all',
                activeTab === 'notes'
                  ? 'border-white bg-white text-zinc-950 shadow-md'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white',
              )}
            >
              <Play className="h-3.5 w-3.5" />
              <span>Notes & Video Outline</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all',
                activeTab === 'practice'
                  ? 'border-white bg-white text-zinc-950 shadow-md'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white',
              )}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Practice Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all',
                activeTab === 'resources'
                  ? 'border-white bg-white text-zinc-950 shadow-md'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white',
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Downloads</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all',
                activeTab === 'certificate'
                  ? 'border-white bg-white text-zinc-950 shadow-md'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white',
              )}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Certificate</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <LessonContent content={currentDetails.body} />

              {!isCompleted && (
                <div className="pt-4">
                  <QuizComponent
                    question={currentDetails.quiz.question}
                    options={quizOptions}
                    correctOptionId={String(currentDetails.quiz.correctIdx)}
                    onComplete={handleQuizComplete}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'practice' && <PracticeLab />}
          {activeTab === 'resources' && <ResourcesDrawer />}
          {activeTab === 'certificate' && (
            <CertificatePreview isCompleted={isCompleted} />
          )}
        </div>

        {/* Right Milestone Progress Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
            <h3 className="text-base font-extrabold text-white">
              Lesson Milestone Progress
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {videoWatched || isCompleted ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <div className="mt-0.5 h-5 w-5 shrink-0 rounded-lg border border-zinc-800 bg-zinc-900" />
                )}
                <div>
                  <p className="text-xs font-bold text-white">
                    Watch Module Video
                  </p>
                  <p className="text-xs font-normal text-zinc-400">
                    Play tutorial video to completion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {(quizCompleted && quizCorrect) || isCompleted ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <div className="mt-0.5 h-5 w-5 shrink-0 rounded-lg border border-zinc-800 bg-zinc-900" />
                )}
                <div>
                  <p className="text-xs font-bold text-white">
                    Pass Concept Quiz
                  </p>
                  <p className="text-xs font-normal text-zinc-400">
                    Select correct option to verify topic.
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-semibold text-rose-400">
                {error}
              </div>
            )}

            {isCompleted ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Module Mastered & Saved</span>
                </div>
                <Link href="/lessons" className="w-full">
                  <button className="h-11 w-full rounded-2xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 hover:bg-zinc-800">
                    Back to Syllabus
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleCompleteLesson}
                disabled={!canComplete || isSubmitting}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-white text-xs font-bold text-zinc-950 shadow-lg transition-all hover:bg-zinc-100 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
                    <span>Saving Progress...</span>
                  </>
                ) : (
                  <span>Submit & Claim Reward</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
