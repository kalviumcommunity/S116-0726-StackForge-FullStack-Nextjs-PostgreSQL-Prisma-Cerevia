import { Skeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';

export default function XpLoading() {
  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 pb-6 border-b border-border">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <Section>
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </Section>

          {/* Card 2 */}
          <Section>
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </Section>

          {/* Card 3 */}
          <Section>
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
          </Section>
        </div>

        {/* History Log Skeleton */}
        <Section>
          <div className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/20 last:border-0">
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
