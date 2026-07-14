import { Skeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';

export default function LeaderboardLoading() {
  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 pb-6 border-b border-border">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Table List Skeleton */}
          <div className="md:col-span-2">
            <Section>
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-64" />
                <div className="space-y-3 pt-4 border-t border-border/40">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-2">
                      <Skeleton className="h-4 w-6" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3.5 w-1/4" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* Sidebar Info Card Skeleton */}
          <Section>
            <div className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-3 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
