'use client';

import { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  Bookmark,
  Clock,
  List,
  ChevronDown,
  ChevronUp,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isTOCExpanded, setIsTOCExpanded] = useState(true);

  const sampleCodeSnippet = `// Production Next.js 15 Server Action Example
export async function completeLessonAction(lessonId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized request");
  }

  const result = await prisma.userProgress.create({
    data: {
      userId: session.user.id,
      lessonId: lessonId,
      completedAt: new Date(),
    },
  });

  revalidatePath("/dashboard");
  return { success: true, xpEarned: 50 };
}`;

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode('sample-snippet');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tocItems = [
    'Module Architecture Overview',
    'Core Prerequisites & System Setup',
    'Implementation & Code Snippets',
    'Key Takeaways & Concept Quiz',
  ];

  return (
    <div className="space-y-6">
      {/* Article Meta Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-semibold text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-400" /> ~5 min read
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-amber-400" /> Interactive Notes
          </span>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={cn(
            'flex select-none items-center gap-1.5 rounded-xl border px-3 py-1.5 transition-all',
            isBookmarked
              ? 'border-amber-500/30 bg-amber-500/10 font-bold text-amber-400'
              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white',
          )}
        >
          <Bookmark
            className={cn('h-3.5 w-3.5', isBookmarked && 'fill-amber-400')}
          />
          <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>

      {/* Sticky Table of Contents Drawer */}
      <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-md backdrop-blur-md">
        <div
          onClick={() => setIsTOCExpanded(!isTOCExpanded)}
          className="flex cursor-pointer select-none items-center justify-between"
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white">
            <List className="h-4 w-4 text-blue-400" />
            <span>Table of Contents</span>
          </div>
          {isTOCExpanded ? (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          )}
        </div>

        {isTOCExpanded && (
          <ul className="space-y-2 border-t border-zinc-800 pt-2 text-xs font-medium text-zinc-400">
            {tocItems.map((item, idx) => (
              <li
                key={idx}
                className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Reading Article Content */}
      <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-sm leading-relaxed text-zinc-300 shadow-xl sm:p-8">
        <div className="space-y-3">
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            1. Module Architecture Overview
          </h2>
          <p className="text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm">
            {content ||
              'This lesson covers production software engineering paradigms, data flow, and modern framework conventions.'}
          </p>
        </div>

        {/* Code Snippet Container */}
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-t-2xl border-x border-t border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-blue-400" />
              <span>actions/complete-lesson.ts</span>
            </div>

            <button
              onClick={() => handleCopyCode(sampleCodeSnippet)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 transition-colors hover:text-white"
            >
              {copiedCode ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <pre className="scrollbar-none overflow-x-auto rounded-b-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-emerald-400">
            <code>{sampleCodeSnippet}</code>
          </pre>
        </div>

        <div className="space-y-3 border-t border-zinc-800/80 pt-4">
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            2. Best Practices & Key Takeaways
          </h2>
          <ul className="space-y-2 text-xs text-zinc-400 sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-400">•</span>
              <span>
                Always enforce type-safe payload validation using Zod schemas
                before persisting state.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-400">•</span>
              <span>
                Leverage optimistic UI updates and Server Actions for
                instantaneous user response.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
