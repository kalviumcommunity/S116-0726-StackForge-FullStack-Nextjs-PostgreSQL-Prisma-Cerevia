import { VideoPlayer } from '@/components/lessons/VideoPlayer';
import { LessonContent } from '@/components/lessons/LessonContent';
import { QuizComponent } from '@/components/lessons/QuizComponent';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lesson Detail | Cerevia',
  description: 'Learn and complete lessons to earn XP.',
};

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Mock data for the layout demonstration
  const lesson = {
    id: resolvedParams.id,
    title: 'Introduction to Full Stack Architecture',
    description: 'Learn the fundamentals of modern full stack application architecture with Next.js and PostgreSQL.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '15:24',
    xpReward: 50,
    isCompleted: false,
    content: 'In this lesson, we will cover the core concepts of...'
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between">
        <Link href="/lessons" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="flex items-center text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
            +{lesson.xpReward} XP
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
            <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {lesson.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              {lesson.description}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <LessonContent content={lesson.content} />
          </div>

          <div className="border-t border-border pt-6 mt-8">
            <QuizComponent 
              question="Which of the following is true about Next.js App Router?"
              options={[
                { id: '1', text: 'It replaces the React library entirely.' },
                { id: '2', text: 'It uses server components by default.' },
                { id: '3', text: 'It only runs on the client side.' },
                { id: '4', text: 'It requires a separate backend for routing.' },
              ]}
              correctOptionId="2"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Lesson Progress</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Watch Video</p>
                  <p className="text-xs text-muted-foreground">15 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-muted shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Complete Quiz</p>
                  <p className="text-xs text-muted-foreground">3 questions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-muted shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Interactive Challenge</p>
                  <p className="text-xs text-muted-foreground">Write code</p>
                </div>
              </div>
            </div>

            <Button className="w-full font-medium" size="lg">
              Continue Lesson
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
