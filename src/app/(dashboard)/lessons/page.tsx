import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Sparkles, Trophy } from 'lucide-react';

export default function LessonsPage() {
  const mockLessons = [
    {
      id: '1',
      title: 'Introduction to Cerevia',
      description: 'Learn the core principles of Caching, Multipliers, and Leaderboard mechanics.',
      xp: 100,
      duration: '5 mins',
      difficulty: 'Beginner',
      completed: true,
    },
    {
      id: '2',
      title: 'Database Sharding Fundamentals',
      description: 'Explore scale-out architecture, database partitioning strategies, and routing systems.',
      xp: 250,
      duration: '15 mins',
      difficulty: 'Intermediate',
      completed: false,
    },
    {
      id: '3',
      title: 'Distributed Locks with Redis',
      description: 'Master transaction locking, concurrency isolation levels, and atomic Redis commands.',
      xp: 400,
      duration: '20 mins',
      difficulty: 'Advanced',
      completed: false,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Lessons & Syllabus"
        description="Expand your backend engineering knowledge and maintain your learning streak."
        actions={
          <Button variant="outline" size="sm" className="gap-1.5">
            <Trophy className="h-4 w-4 text-orange-500" />
            <span>View Multipliers</span>
          </Button>
        }
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockLessons.map((lesson) => (
            <Card key={lesson.id} className={lesson.completed ? 'opacity-85' : ''}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant={lesson.completed ? 'success' : 'secondary'}>
                    {lesson.completed ? 'Completed' : lesson.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </div>
                <CardTitle className="text-base line-clamp-1">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">
                  {lesson.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2 flex items-center justify-between text-xs border-y border-border/40 bg-muted/5">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Syllabus Core</span>
                </div>
                <span className="font-semibold text-orange-500">+{lesson.xp} XP</span>
              </CardContent>
              <CardFooter className="pt-4 justify-between">
                {lesson.completed ? (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Review Completed Lesson
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" className="w-full group">
                    <span>Start Lesson</span>
                    <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
